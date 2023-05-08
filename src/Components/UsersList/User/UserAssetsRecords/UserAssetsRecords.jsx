import React, { useState } from 'react'
import './UserAssetsRecords.css'
import { GetFromStoreWithId, GetFromStore, GetRecordsOfUser } from '../../../../Functions/StoreMiddleware';
import { connect } from 'react-redux'
import AssetModal from '../../../AssetList/Asset/AssetModal'
import { NotificationAlerta } from '../../../../NotificationUtils';
import { v4 } from 'uuid';
import Record from '../../../Record/Record'
import RecordsFormFilter from '../../../RecordsFormFilter/RecordsFormFilter'
import Show from '../../../LayoutComponents/Show/Show';
import Warning from '../../../LayoutComponents/Warning/Warning';

const UserAssetRecords = (props) => {


    //STATES
    const [Records, SetRecords] = useState([])
    const [SelectedAsset, setSelectedAsset] = useState({})
    const [modalShow, setModalShow] = useState(false);

    //RESET SELECTED ASSET 
    const ResetSelectedAsset = () => {
        setModalShow(false);
        setSelectedAsset({});
    }

    //HANDLE ASSET SELECTION
    const handleAssetSelection = (Id) => {
        const Asset = GetFromStoreWithId('AssetsWithDeleted',Id)
        if (Asset.Deleted === false) {
            if (props.FromModal === false) {
                setSelectedAsset(Asset)
                setModalShow(true)
            }
        } else {
            NotificationAlerta("Aviso", "Este Ativo foi deletado da base de dados, não sendo possível exibir suas informações")
        }

    }




    return (
        <>
            <AssetModal FromModal={true} CurrentUser={props.CurrentUser} Asset={{ ...SelectedAsset }} show={modalShow} onHide={() => setModalShow(false)} Function="View" onDelete={ResetSelectedAsset} />
            <div className={props.Tema === 'Escuro' ? 'UserAssetRecords-ContainerEscuro UserAssetRecords-Container' : 'UserAssetRecords-ContainerClaro UserAssetRecords-Container'}>

                {/***********   FORM FILTER   *************/}
                <RecordsFormFilter
                    GetRecords={GetRecordsOfUser}
                    SetRecords={SetRecords}
                    Asset={props?.User || {}}
                />

                {/***********   RECORDS  *************/}
                {Records.map(Registro =>
                    <Record
                        key={v4()}
                        Record={Registro}
                        handleAssetSelection={handleAssetSelection}
                        handleUserSelection={() => { }}
                        PerspectiveOf='Asset'
                    />
                )}

                <Show Show={Records.length === 0}>
                    <Warning Text='Nenhum Registro encontrado' />
                </Show>

            </div>

        </>
    )
}



const ConnectedUserAssetRecords = connect((state) => {
    return {
        Tema: state.Tema,
        CurrentUser : state.CurrentUser
    }
})(UserAssetRecords)

export default ConnectedUserAssetRecords
