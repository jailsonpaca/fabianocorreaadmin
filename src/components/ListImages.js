import React, { useState, useEffect } from 'react';
import {Button as ButtonMui } from '@material-ui/core';

export default function ListImages({ record = {}, source,selectImage }) {

    const [imgs, setImgs] = useState([]);

    useEffect(() => {
        var isCancelled = false;
        function setImagens() {
            var ar;
            if (record[source]) {
                if (typeof record[source] !== 'object') {
                    ar = [record[source]];
                    if (!isCancelled) {
                        setImgs(ar);
                    }
                } else {
                    ar = Object.values(record[source]);
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
    }, [record, source]);

    function handleImgSelect(e){
        console.log(e);
        selectImage(e);
    }

    return (
            <div className="listImagesContainer">
                <div className="preview">
                    {typeof imgs === 'object' && imgs.map((e, i) =>
                        <div onClick={()=>{console.log("teste"); handleImgSelect(e);}} key={i} >Imagem {i}</div>
                    )}
                </div>
            </div>
    );
}