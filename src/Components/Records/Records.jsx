import React, { useState, useEffect } from 'react'
import './Records.css'
import { GetFromStore, GetFromStoreWithId } from '../../Functions/StoreMiddleware';
import UserModal from '../UsersList/User/UserModal'
import AssetModal from '../../Components/AssetList/Asset/AssetModal'
import { v4 } from 'uuid';
import { connect } from 'react-redux'
import { NotificationAlerta } from '../../NotificationUtils';
import Record from '../Record/Record'
import Show from '../LayoutComponents/Show/Show';
import RecordsFormFilter from '../RecordsFormFilter/RecordsFormFilter';
import Warning from '../LayoutComponents/Warning/Warning';

import { GetFromFirebaseFunctions } from '../../Functions/DatabaseMiddleware';

const Records = (props) => {

    const CurrentUser = GetFromStore('CurrentUser')

    //Quantidades 
    const [Records, SetRecords] = useState([])
    const [SelectedUser, setSelectedUser] = useState({})
    const [SelectedAsset, setSelectedAsset] = useState({})
    const [modalShow, setModalShow] = useState(false);
    const [modalShowAsset, setModalShowAsset] = useState(false);

    /* DO BANCO
    useEffect(() => {
        GetFromFirebaseFunctions["Records"]().then((RecordsFromDatabse) => {
            //console.log("DO Banco", RecordsFromDatabse)
            SetRecords(RecordsFromDatabse)
        })
    }, [])
    */

    //RESET SELECTED USER
    const ResetSelectedUser = () => {
        setModalShow(false);
        setSelectedUser({});
    }

    //RESET SELECTED ASSET
    const ResetSelectedAsset = () => {
        setModalShow(false);
        setSelectedAsset({});
    }

    //HANDLE USER SELECTION INSIDE RECORD
    const handleUserSelection = (Id) => {
        const User = GetFromStoreWithId('UsersWithDeleted', Id)
        if (User.Deleted === false) {
            setSelectedUser(User)
            setModalShow(true)
        } else {
            NotificationAlerta("Aviso", "Este usuário foi deletado da base de dados, não sendo possível exibir suas informações")
        }
    }

    //HANDLE ASSET SELECTION INSIDE RECORD
    const handleAssetSelection = (Id) => {
        const Asset = GetFromStoreWithId('AssetsWithDeleted', Id)
        if (Asset.Deleted === false) {
            setSelectedAsset(Asset)
            setModalShowAsset(true)
        } else {
            NotificationAlerta("Aviso", "Este Ativo foi deletado da base de dados, não sendo possível exibir suas informações")
        }
    }


    return (
        <>
            <AssetModal FromModal={true} CurrentUser={CurrentUser} Asset={{ ...SelectedAsset }} show={modalShowAsset} onHide={() => setModalShowAsset(false)} Function="View" onDelete={ResetSelectedAsset} />
            <UserModal FromModal={true} CurrentUser={CurrentUser} User={{ ...SelectedUser }} show={modalShow} onHide={() => setModalShow(false)} Function="View" onDelete={ResetSelectedUser} />

            <div className={props.Tema === 'Escuro' ? 'AssetRecords-ContainerEscuro AssetRecords-Container' : 'AssetRecords-ContainerClaro AssetRecords-Container'} >

                {/***********   FORM FILTER   *************/}
                <RecordsFormFilter
                    GetRecords={() => GetFromStore('RecordsAssets')}
                    SetRecords={SetRecords}
                    Asset={SelectedUser}
                />

                {/***********   RECORDS   *************/}
                {Records.map(Registro =>
                    <Record
                        key={v4()}
                        Record={Registro}
                        handleAssetSelection={handleAssetSelection}
                        handleUserSelection={handleUserSelection}
                        PerspectiveOf='Asset'
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