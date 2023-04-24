import React, { useState } from 'react'
import './UserAtivoRecords.css'
import { GetFromStoreWithId, GetFromStore, GetRecordsOfUser } from '../../../../Functions/Middleware';
import { connect } from 'react-redux'
import AtivoModal from '../../../AtivosList/Ativo/AtivoModal'
import { NotificationAlerta } from '../../../../NotificationUtils';
import { v4 } from 'uuid';
import Record from '../../../Record/Record'
import RecordsFormFilter from '../../../RecordsFormFilter/RecordsFormFilter'
import Show from '../../../LayoutComponents/Show/Show';
import Warning from '../../../LayoutComponents/Warning/Warning';

const UserAtivoRecords = (props) => {

    const CurrentUser = GetFromStore('CurrentUser')

    //STATES
    const [Records, SetRecords] = useState([])
    const [SelectedAtivo, setSelectedAtivo] = useState({})
    const [modalShow, setModalShow] = useState(false);

    //RESET SELECTED ATIVO 
    const ResetSelectedAtivo = () => {
        setModalShow(false);
        setSelectedAtivo({});
    }

    //HANDLE ATIVO SELECTION
    const handleAtivoSelection = (Id) => {
        const Ativo = GetFromStoreWithId('AtivosWithDeleted',Id)
        if (Ativo.Deleted === false) {
            if (props.FromModal === false) {
                setSelectedAtivo(Ativo)
                setModalShow(true)
            }
        } else {
            NotificationAlerta("Aviso", "Este Ativo foi deletado da base de dados, não sendo possível exibir suas informações")
        }

    }




    return (
        <>
            <AtivoModal FromModal={true} CurrentUser={CurrentUser} Ativo={{ ...SelectedAtivo }} show={modalShow} onHide={() => setModalShow(false)} Function="View" onDelete={ResetSelectedAtivo} />
            <div className={props.Tema === 'Escuro' ? 'UserAtivoRecords-ContainerEscuro UserAtivoRecords-Container' : 'UserAtivoRecords-ContainerClaro UserAtivoRecords-Container'}>

                {/***********   FORM FILTER   *************/}
                <RecordsFormFilter
                    GetRecords={GetRecordsOfUser}
                    SetRecords={SetRecords}
                    Ativo={props?.User || {}}
                />

                {/***********   RECORDS  *************/}
                {Records.map(Registro =>
                    <Record
                        key={v4()}
                        Record={Registro}
                        handleAtivoSelection={handleAtivoSelection}
                        handleUserSelection={() => { }}
                        PerspectiveOf='Ativo'
                    />
                )}

                <Show Show={Records.length === 0}>
                    <Warning Text='Nenhum Registro encontrado' />
                </Show>

            </div>

        </>
    )
}



const ConnectedUserAtivoRecords = connect((state) => {
    return {
        Tema: state.Tema
    }
})(UserAtivoRecords)

export default ConnectedUserAtivoRecords
