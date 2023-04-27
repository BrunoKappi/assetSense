import React, { useState, useEffect } from 'react'
import './AssetRecords.css'
import { GetFromStore, GetFromStoreWithId, GetRecordsOfAsset } from '../../../../Functions/StoreMiddleware';
import { UilCommentInfoAlt } from '@iconscout/react-unicons'
//Tooltip
import UserModal from '../../../UsersList/User/UserModal'
import { NotificationAlerta } from '../../../../NotificationUtils';
import { v4 } from 'uuid';
import { connect } from 'react-redux'
import Record from '../../../Record/Record'
import Show from '../../../LayoutComponents/Show/Show';
import RecordsFormFilter from '../../../RecordsFormFilter/RecordsFormFilter'
const AssetRecords = (props) => {

    const CurrentUser = GetFromStore('CurrentUser')

    //QUANTIDADES 
    const [Records, SetRecords] = useState([])
    const [SelectedUser, setSelectedUser] = useState({})
    const [modalShow, setModalShow] = useState(false);

    //FILL LIST
    useEffect(() => {
        SetRecords(GetRecordsOfAsset(props.Asset?.id))
    }, [props.Asset?.id, props.RecordsAssets])

    //RESET SELECTED USER 
    const ResetSelectedUser = () => {
        setModalShow(false);
        setSelectedUser({});
    }

    //WHEN CLICK USER
    const handleUserSelection = (Id) => {
        const User = GetFromStoreWithId('UsersWithDeleted', Id)
        if (User.Deleted === false && props.FromModal === false) {
            setSelectedUser(User)
            setModalShow(true)
        } else {
            NotificationAlerta("Aviso", "Este usuário foi deletado da base de dados, não sendo possível exibir suas informações")
        }

    }


    return (
        <>
            <UserModal FromModal={true} CurrentUser={CurrentUser} User={{ ...SelectedUser }} show={modalShow} onHide={() => setModalShow(false)} Function="View" onDelete={ResetSelectedUser} />

            <div className={props.Tema === 'Escuro' ? 'AssetRecords-ContainerEscuro AssetRecords-Container' : 'AssetRecords-ContainerClaro AssetRecords-Container'}>


                {/***********   FORM FILTER   *************/}
                <RecordsFormFilter
                    GetRecords={GetRecordsOfAsset}
                    SetRecords={SetRecords}
                    Asset={props?.Asset || {}}
                />

                {/***********   RECORDS   *************/}
                {Records.map(Registro =>
                    <Record
                        key={v4()}
                        Record={Registro}
                        handleAssetSelection={() => { }}
                        handleUserSelection={handleUserSelection}
                        PerspectiveOf='User'
                    />
                )}

                {/***********   NO RECORD FOUND   *************/}
                <Show Show={Records.length === 0}>
                    <div className='AssetsRecords-TakeForm'>
                        <div className='AssetsRecords-AvisoInfo'>
                            <div className='AssetsRecords-AvisoInfo-Item'>
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


const ConnectedAssetRecords = connect((state) => {
    return {
        Tema: state.Tema,
        RecordsAssets: state.RecordsAssets
    }
})(AssetRecords)

export default ConnectedAssetRecords 