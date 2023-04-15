import React, { useState } from 'react'
import './Records.css'
import { GetAtivoWithIdFromStore, GetCurrentUserFromStore, GetRecordsFromStore, GetRecordsOfAtivo, GetuserNameWithIdFromStore, GetUserWithIdFromStore } from '../../Functions/Middleware';
import { UilCommentInfoAlt } from '@iconscout/react-unicons'
import UsuarioModal from '../../Components/UsersList/User/UsuarioModal'
import AtivoModal from '../../Components/AtivosList/Ativo/AtivoModal'
import { v4 } from 'uuid';
import { connect } from 'react-redux'
import { NotificationAlerta } from '../../NotificationUtils';
import Record from '../Record/Record'
import Show from '../LayoutComponents/Show/Show';
import RecordsFormFilter from '../RecordsFormFilter/RecordsFormFilter';
import Warning from '../LayoutComponents/Warning/Warning';

const Records = (props) => {

    const CurrentUser = GetCurrentUserFromStore()

    //Quantidades 
    const [Records, SetRecords] = useState(GetRecordsFromStore())
    const [SelectedUser, setSelectedUser] = useState({})
    const [SelectedAtivo, setSelectedAtivo] = useState({})
    const [modalShow, setModalShow] = useState(false);
    const [modalShowAtivo, setModalShowAtivo] = useState(false);

    //RESET SELECTED USER
    const ResetSelectedUser = () => {
        setModalShow(false);
        setSelectedUser({});
    }

    //RESET SELECTED ATIVO
    const ResetSelectedAtivo = () => {
        setModalShow(false);
        setSelectedAtivo({});
    }

    //HANDLE USER SELECTION INSIDE RECORD
    const handleUserSelection = (Id) => {
        const User = GetUserWithIdFromStore(Id)
        if (User.Deleted === false) {
            setSelectedUser(User)
            setModalShow(true)
        } else {
            NotificationAlerta("Aviso", "Este usuário foi deletado da base de dados, não sendo possível exibir suas informações")
        }
    }

    //HANDLE ATIVO SELECTION INSIDE RECORD
    const handleAtivoSelection = (Id) => {
        const Ativo = GetAtivoWithIdFromStore(Id)
        if (Ativo.Deleted === false) {
            setSelectedAtivo(Ativo)
            setModalShowAtivo(true)
        } else {
            NotificationAlerta("Aviso", "Este Ativo foi deletado da base de dados, não sendo possível exibir suas informações")
        }
    }


    return (
        <>
            <AtivoModal FromModal={true} CurrentUser={CurrentUser} Ativo={{ ...SelectedAtivo }} show={modalShowAtivo} onHide={() => setModalShowAtivo(false)} Function="View" onDelete={ResetSelectedAtivo} />
            <UsuarioModal FromModal={true} CurrentUser={CurrentUser} User={{ ...SelectedUser }} show={modalShow} onHide={() => setModalShow(false)} Function="View" onDelete={ResetSelectedUser} />

            <div className={props.Tema === 'Escuro' ? 'AtivoRecords-ContainerEscuro AtivoRecords-Container' : 'AtivoRecords-ContainerClaro AtivoRecords-Container'} >

                {/***********   FORM FILTER   *************/}
                <RecordsFormFilter
                    GetRecords={GetRecordsFromStore}
                    SetRecords={SetRecords}
                    Ativo={props?.Ativo || {}}
                />

                {/***********   RECORDS   *************/}
                {Records.map(Registro =>
                    <Record
                        key={v4()}
                        Record={Registro}
                        handleAtivoSelection={handleAtivoSelection}
                        handleUserSelection={handleUserSelection}
                        PerspectiveOf='Ativo'
                    />
                )}

                {/***********   NO RECORDS  FOUND *************/}
                <Show Show={Records.length === 0}>
                    <Warning Text='Nenhum Registro encontrado' />
                </Show>


            </div>

        </>
    )
}


const ConnectedRecords = connect((state) => {
    return {
        Tema: state.Tema
    }
})(Records)

export default ConnectedRecords 