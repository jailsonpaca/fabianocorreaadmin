import React, { useState, useEffect } from 'react';
import {Button as ButtonMui,TextField} from '@material-ui/core';
import { useField } from 'react-final-form';


export default function CustomTextInput({ record = {},label, source,imagens }) {

    const [imgs, setImgs] = useState([]);
    const [content,setContent]=useState(record[source]);
    const {
        input: { onChange },
        meta: { touched, error }
    } = useField(source);
    useEffect(() => {
        var isCancelled = false;
        function setImagens() {
            var ar;
            if (record[imagens]) {
                if (typeof record[imagens] !== 'object') {
                    ar = [record[imagens]];
                    if (!isCancelled) {
                        setImgs(ar);
                    }
                } else {
                    ar = Object.values(record[imagens]);
                    if (!isCancelled) {
                        setImgs(ar);
                    }
                }
            }
            console.log(record);
        }
        setImagens();
        return () => {
            isCancelled = true;
        };
    }, [record, imagens]);

    function handleImgSelect(e){
        console.log(e);
        setContent(content+' '+e);
        onChange(content);
    }
    const handleInputChange=(e)=>{
        console.log(e.target.value);
        setContent(e.target.value);
        onChange(content);
    }

    return (
            <div className="listImagesContainer">
                 <TextField value={content}  label={label} variant="filled" type="text" onChange={handleInputChange} error={!!(touched && error)}
            helperText={touched && error}/>
                <div className="preview">
                    {typeof imgs === 'object' && imgs.map((e, i) =>
                        <ButtonMui size="small" variant="outlined" onClick={()=>{console.log("teste"); handleImgSelect(e);}} key={i} >Imagem {i}</ButtonMui>
                    )}
                </div>
            </div>
    );
}