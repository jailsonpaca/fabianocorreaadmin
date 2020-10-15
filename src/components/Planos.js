import React, { useState, Fragment } from 'react';
import { List, Edit, Filter, Datagrid, useMutation, EditButton, TextField, ArrayInput,ArrayField , SimpleFormIterator,SingleFieldList, BooleanField, Create, SimpleForm, TextInput, BooleanInput } from 'react-admin';
import { useMediaQuery, ListItem, ListItemText, Button as ButtonMui } from '@material-ui/core';
import { ColorField, ColorInput } from 'react-admin-color-input';
import useLongPress from './useLongPress';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

const validatePlanos = (values) => {
   /* const errors = {};
    if (!values.title) {
        errors.title = ['É necessário preencher o title'];
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

const PlanosFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Pesquisar" source="title" alwaysOn />
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
                    <ListItemText multiline="true" primary={<TextField source="title" record={data[id]} />}
                        secondary={`${data[id].published ? ("Publicado") : ("Não Publicado")}`} />
                    <ListItemText multiline="true" primary={`R$ ${data[id].totalPrice}`} />
                    <EditButton resource="plans" basePath={basePath} record={data[id]} />
                </ListItem>
            )}
        </div>
    )
};
CustomList.defaultProps = {
    data: {},
    ids: [],
};

export const ListPlanos = (props) => {
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
                aria-label="Excluir plano"
            >
                <DialogTitle>Deseja excluir este card dos Planos?</DialogTitle>
                <DialogActions>
                    <CustomDeleteButton id={id} />
                </DialogActions>
            </Dialog>
            <List {...props} title="Planos" filters={<PlanosFilter />}>
                {isSmall ? (
                    <CustomList handleLongPress={handleLongPress} setId={handleSetId} />
                ) : (
                        <Datagrid rowClick="edit">
                            <TextField source="id" />
                            <TextField source="title" label="Título" />
                            <TextField source="description" label="Descrição" />
                            <TextField source="price" label="Preço por sessão" />
                            <TextField source="totalPrice" label="Preço do pacote" />
                            <ArrayField source="obs" label="Obs">
                                <SingleFieldList>
                                    <TextField />
                                </SingleFieldList>
                            </ArrayField>
                            {/*<TextField source="obs" multiline label="Obs" />*/}
                            <ColorField source="color" label="Cor" />
                            <BooleanField source="published" label="Publicar" />
                        </Datagrid>
                    )}
            </List>
        </Fragment>
    )
};


export const EditPlanos = (props) => {

    return (
        <Edit {...props}>
            <SimpleForm validate={validatePlanos}>
                <TextInput disabled source="id" />
                <TextInput source="title" label="Título" />
                <TextInput source="description" label="Descrição" />
                <TextInput source="price" label="Preço por sessão" />
                <TextInput source="totalPrice" label="Preço do pacote" />
                <ArrayInput source="obs" label="Obs">
                    <SimpleFormIterator>
                        <TextInput />
                    </SimpleFormIterator>
                </ArrayInput>
                {/*<TextInput source="obs" multiline label="Obs" />*/}
                <ColorInput source="color" label="Cor" />
                <BooleanInput source="published" label="Publicado" />
            </SimpleForm>
        </Edit>
    )
};


export const CreatePlanos = (props) => {

    var makeID = function (toSet) {
        var newId = Math.random().toString(36).substr(2, 9);
        return newId;
    };

    return (
        <Create {...props}>
            <SimpleForm validate={validatePlanos}>
                <TextInput disabled source="id" defaultValue={React.useMemo(() => makeID(true), [])} />
                <TextInput source="title" label="Título" />
                <TextInput source="description" label="Descrição" />
                <TextInput source="price" label="Preço por sessão" />
                <TextInput source="totalPrice" label="Preço do pacote" />
                <ArrayInput source="obs" label="Obs">
                    <SimpleFormIterator>
                        <TextInput />
                    </SimpleFormIterator>
                </ArrayInput>
                {/*<TextInput  multiline label="Obs" />*/}
                <TextInput source="color    " label="Cor" />
                <BooleanInput source="published" label="Público" defaultValue={false} />
            </SimpleForm>
        </Create>
    )
};