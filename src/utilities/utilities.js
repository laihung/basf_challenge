import './utilities.scss';

export const concatArrToStr = (value, delimiter) => {
    if (!value) {
        return '';
    }

    if (value.length === 0) {
        return '';
    }

    return value.join(delimiter);
}


export const highlightText = (originalValue, textToHighlight) => {
    if (!textToHighlight) {
        return originalValue;
    }

    const _originalValue = originalValue.toLowerCase();
    const _textToHighlight = textToHighlight.toLowerCase();
    const index = _originalValue.indexOf(_textToHighlight);

    if (index === -1) {
        return originalValue;
    }
    
    const originalSearchedValue = originalValue.substring(index, textToHighlight.length);
    const result = _originalValue.replace(_textToHighlight, `<span class='highlightText'>${originalSearchedValue}</span>`);
    return result;
}