import React, { useState, useEffect } from 'react'
import './AtivoRecords.css'
import { GetFromStore, GetFromStoreWithId, GetRecordsOfAtivo } from '../../../../Functions/Middleware';
import { UilCommentInfoAlt } from '@iconscout/react-unicons'
//Tooltip
import UsuarioModal from '../../../UsersList/User/UsuarioModal'
import { NotificationAlerta } from '../../../../NotificationUtils';
import { v4 } from 'uuid';
import { connect } from 'react-redux'
import Record from '../../../Record/Record'
import Show from '../../../LayoutComponents/Show/Show';
import RecordsFormFilter from '../../../RecordsFormFilter/RecordsFormFilter'
const AtivoRecords = (props) => {

    const CurrentUser = GetFromStore('CurrentUser')

    //QUANTIDADES 
    const [Records, SetRecords] = useState([])
    const [SelectedUser, setSelectedUser] = useState({})
    const [modalShow, setModalShow] = useState(false);

    //FILL LIST
    useEffect(() => {
        SetRecords(GetRecordsOfAtivo(props.Ativo?.id))
    }, [props.Ativo?.id, props.RecordsAtivos])

    //RESET SELECTED USER 
    const ResetSelectedUser = () => {
        setModalShow(false);
        setSelectedUser({});
    }

    //WHEN CLICK USER
    const handleUserSelection = (Id) => {
        const User = GetFromStoreWithId('UsuariosWithDeleted', Id)
        if (User.Deleted === false && props.FromModal === false) {
            setSelectedUser(User)
            setModalShow(true)
        } else {
            NotificationAlerta("Aviso", "Este usuário foi deletado da base de dados, não sendo possível exibir suas informações")
        }

    }


    return (
        <>
            <UsuarioModal FromModal={true} CurrentUser={CurrentUser} User={{ ...SelectedUser }} show={modalShow} onHide={() => setModalShow(false)} Function="View" onDelete={ResetSelectedUser} />

            <div className={props.Tema === 'Escuro' ? 'AtivoRecords-ContainerEscuro AtivoRecords-Container' : 'AtivoRecords-ContainerClaro AtivoRecords-Container'}>


                {/***********   FORM FILTER   *************/}
                <RecordsFormFilter
                    GetRecords={GetRecordsOfAtivo}
                    SetRecords={SetRecords}
                    Ativo={props?.Ativo || {}}
                />

                {/***********   RECORDS   *************/}
                {Records.map(Registro =>
                    <Record
                        key={v4()}
                        Record={Registro}
                        handleAtivoSelection={() => { }}
                        handleUserSelection={handleUserSelection}
                        PerspectiveOf='User'
                    />
                )}

                {/***********   NO RECORD FOUND   *************/}
                <Show Show={Records.length === 0}>
                    <div className='AtivosRecords-TakeForm'>
                        <div className='AtivosRecords-AvisoInfo'>
                            <div className='AtivosRecords-AvisoInfo-Item'>
                                <UilCommentInfoAlt />
                                <span>Nenhum registro encontrado</span>
                            </div>
                        </div>
                    </div>
                </Show>

            </div>
        </>
    )
}


const ConnectedAtivoRecords = connect((state) => {
    return {
        Tema: state.Tema,
        RecordsAtivos: state.RecordsAtivos
    }
})(AtivoRecords)

export default ConnectedAtivoRecords 