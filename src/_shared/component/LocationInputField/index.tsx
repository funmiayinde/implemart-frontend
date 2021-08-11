import React, {useState, useEffect, useRef} from 'react';

let autoComplete: any;

const loadScript = (url: string, done: Function) => {
    let script: any | HTMLElementTagNameMap = document.createElement('script');
    script.type = 'text/javascript';

    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState === 'loaded' || script.readyState === 'complete') {
                script.onreadystatechange = null;
                done();
            }
        }
    } else {
        script.onload = () => done();
    }
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
};

const handleScriptLoad = (updateQuery: any, autoCompleteRef: any) => {
    autoComplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current, {types: ['(cities)']});
    autoComplete.setFields(['address_components', 'formatted_address']);
    autoComplete.addListener('place_changed', () => handlePlaceSelect);
};

const handlePlaceSelect = async (updateQuery: Function) => {
    const addressObject = autoComplete.getPlace();
    const query = addressObject.formatted_address;
    updateQuery(query);
    console.log('addressObject:::', addressObject);
};

type LocationInputFieldProps = {
    onChange: Function,
    onSelect: Function,
    value: string,
    className?: any;
    placeHolder?: string
};

const LocationInputField = ({onChange, className,value, onSelect, placeHolder}: LocationInputFieldProps) => {
    const [query, setQuery] = useState('');
    const autocompleteRef = useRef(null);

    const handleQuery = (query: string) => {
        console.log('handleQuery:', query);
        setQuery(query);
        onSelect(query);
    };

    const handleOnChange = (e: any) => {
        setQuery(e.target.value);
        console.log('query:', query);
        onChange(e.target.value);
    };

    useEffect(() => {
        if (value) {
            setQuery(value);
        }
    }, [value]);

    useEffect(() => {
        loadScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
            () => handleScriptLoad(handleQuery, autocompleteRef))
    }, []);
    return (
        <div>
            <input
                ref={autocompleteRef}
                className={className ? className : 'form-control'}
                placeholder={placeHolder || 'Enter a Location'}
                onChange={e => handleOnChange(e)}
                value={query}
            />
        </div>
    )
};

export default LocationInputField;

