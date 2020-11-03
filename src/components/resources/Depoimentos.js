import React, { useState, Fragment } from 'react';
import {
    List, Edit, Filter, Datagrid, useMutation, EditButton, TextField, FileField,
    BooleanField, Create, SimpleForm, TextInput, FileInput, BooleanInput
} from 'react-admin';
import { useMediaQuery, ListItem, ListItemText, Button as ButtonMui } from '@material-ui/core';
import useLongPress from './../utils/useLongPress';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

const validateDepoimentos = (values) => {
    /* const errors = {};
     if (!values.name) {
         errors.name = ['É necessário preencher o name'];
     }
     if (!values.description) {
         errors.description = ['É necessário preencher a descrição'];
     }
     if (!values.price) {
         errors.price = ['É necessário preencher o preço da sessão'];
     }
     if (!values.totalPrice) {
         errors.totalPrice = ['É necessário preencher o preço do pacote'];
     }
     if (!values.obs) {
         errors.obs = ['É necessário preencher as observações'];
     }
     if (!values.color) {
         errors.color = ['É necessário preencher a cor'];
     }
     return errors;*/
};
/*
var originalLog = console.error
console.error = function log(...args) {
    if (args.length > 0 && typeof args[0] === "string" && /^Warning: Missing translation/.test(args[0])) {
        return
    }
    originalLog.apply(console, args)
}*/

const DepoimentosFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Pesquisar" source="name" alwaysOn />
    </Filter>
);

const CustomDeleteButton = (props) => {
    console.log(props);
    const [deleteAction, { loading }] = useMutation({
        type: 'delete',
        resource: 'plans',
        payload: { id: props.id }
    });
    console.log(loading);
    return <ButtonMui startIcon={<DeleteIcon />} onClick={deleteAction} variant="contained" className="deleteButton" disabled={loading}>Excluir</ButtonMui>;
};

const CustomList = ({ ids, data, basePath, handleLongPress, setId }) => {
    const backspaceLongPress = useLongPress(() => handleLongPress(true), 500);
    function handleMouseDown(e) {
        console.log(e);
        setId(e)
        backspaceLongPress.onMouseDown();
    }
    function handleTouchStart(e) {
        console.log(e);
        setId(e)
        backspaceLongPress.onTouchStart();
    }
    return (
        <div style={{ margin: '1em' }}>
            {ids.map(id =>
                <ListItem key={id} onMouseDown={() => handleMouseDown(id)}
                    onMouseUp={() => backspaceLongPress.onMouseUp()}
                    onMouseLeave={() => backspaceLongPress.onMouseLeave()}
                    onTouchStart={() => handleTouchStart(id)}
                    onTouchEnd={() => backspaceLongPress.onTouchEnd()}>
                    <ListItemText multiline="true" primary={<TextField source="name" record={data[id]} />}
                        secondary={`${data[id].published ? ("Publicado") : ("Não Publicado")}`} />
                    <ListItemText multiline="true" primary={`R$ ${data[id].totalPrice}`} />
                    <EditButton resource="depoiments" basePath={basePath} record={data[id]} />
                </ListItem>
            )}
        </div>
    )
};
CustomList.defaultProps = {
    data: {},
    ids: [],
};

export const ListDepoimentos = (props) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const [showDialog, setShowDialog] = useState(false);
    const [id, setId] = useState('');
    function handleLongPress(e) {
        console.log("LONG PRESS");

        setShowDialog(e);
    }
    function handleSetId(newId) {
        setId(newId);
    }
    return (
        <Fragment>
            <Dialog
                fullWidth
                open={showDialog}
                onClose={() => handleLongPress(false)}
                aria-label="Excluir depoimento"
            >
                <DialogTitle>Deseja excluir este card dos Depoimentos?</DialogTitle>
                <DialogActions>
                    <CustomDeleteButton id={id} />
                </DialogActions>
            </Dialog>
            <List {...props} title="Depoimentos" filters={<DepoimentosFilter />}>
                {isSmall ? (
                    <CustomList handleLongPress={handleLongPress} setId={handleSetId} />
                ) : (
                        <Datagrid rowClick="edit">
                            <TextField source="id" />
                            <TextField source="name" label="Nome" />
                            <TextField source="job" label="Profissão" />
                            <TextField source="description" label="Descrição" />
                            <FileField source="image.src" title="image.title" label="Foto" />
                            <BooleanField source="published" label="Publicar" />
                        </Datagrid>
                    )}
            </List>
        </Fragment>
    )
};


export const EditDepoimentos = (props) => {

    return (
        <Edit {...props}>
            <SimpleForm validate={validateDepoimentos}>
                <TextInput disabled source="id" />
                <TextInput source="name" label="Nome" />
                <TextInput source="job" label="Profissão" />
                <TextInput source="description" label="Descrição" />
                <FileInput source="image" label="Foto" accept="image/*">
                    <FileField source="image" title="title" />
                </FileInput>
                <BooleanInput source="published" label="Publicado" />
            </SimpleForm>
        </Edit>
    )
};


export const CreateDepoimentos = (props) => {

    var makeID = function (toSet) {
        var newId = Math.random().toString(36).substr(2, 9);
        return newId;
    };

    return (
        <Create {...props}>
            <SimpleForm validate={validateDepoimentos}>
                <TextInput disabled source="id" defaultValue={React.useMemo(() => makeID(true), [])} />
                <TextInput source="name" label="Nome" />
                <TextInput source="job" label="Profissão" />
                <TextInput source="description" label="Descrição" />
                <FileInput source="image" label="Foto" accept="image/*">
                    <FileField source="image" title="title" />
                </FileInput>
                <BooleanInput source="published" label="Público" defaultValue={false} />
            </SimpleForm>
        </Create>
    )
};