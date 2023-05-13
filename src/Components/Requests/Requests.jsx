import React, { useState } from 'react'
import './Requests.css'
import { GetFromStoreWithId, GetNameFromStoreWithId } from '../../Functions/StoreMiddleware';
import AddRequestModal from './AddRequestModal/AddRequestModal'
import { connect } from 'react-redux'
import Show from '../LayoutComponents/Show/Show'
import Loading from '../LoadingForTabs/Loading';
import Warning from '../LayoutComponents/Warning/Warning';
import SectionTitle from '../LayoutComponents/SectionTitle/SectionTitle';
import FilterSelect from '../LayoutComponents/FilterSelect/FilterSelect'
import OrderBy from '../LayoutComponents/OrderBy/OrderBy'
import Request from './Request/Request'
import { v4 } from 'uuid';
import TabsContainer from '../LayoutComponents/TabsContainer/TabsContainer';
import TabButton from '../LayoutComponents/TabButton/TabButton';
import { OPEN_REQUESTS } from '../../Functions/PermitsMiddleware';
import { NotificationErro } from '../../NotificationUtils';
import RequestModal from './RequestModal/RequestModal'
import Info from '../LayoutComponents/Info/Info'

const Requests = (props) => {

    const [AddRequestModalOpen, setAddRequestModalOpen] = useState(false);

    const [Loaded, setLoaded] = useState(true);
    const [modalShow, setModalShow] = useState(false);

    //FILTERS
    const [FiltroDeTexto, setFiltroDeTexto] = useState('');
    const [Filters, setFilters] = useState([]);
    const [ResetFilters, setResetFilters] = useState(false);
    const [OrdenarPor, setOrdenarPor] = useState('Data de Solicitação');
    const [SelectedRequest, setSelectedRequest] = useState({});



    //PERMITS E USER TYPE   
    var PermitToOpenRequests = OPEN_REQUESTS()

    //USER CLICK
    const handleRequestClick = (RequestClicked) => {
        setModalShow(true);
        setSelectedRequest({ ...RequestClicked });
    }

    // GET INITIAL TAB BASED ON PERMITS
    const getInitialTab = () => {
        return 'AllRequests'
    }

    //STATES
    const [key, setKey] = useState(getInitialTab());

    // KEY TO CONFIG TAB
    const SetKeyConfig = (Key) => {
        if (Key === 'AllRequests')
            setKey(Key)
        else if (Key === 'MyRequests')
            setKey(Key)
        else
            NotificationErro("Não Autorizado", "Você não possui permissão para Acessar essa aba, solicite autorização para seu Administrador")
    }

    //CHECK
    const CheckIncludesText = (What) => {
        return What.toLowerCase().includes(FiltroDeTexto.trim().toLowerCase())
    }

    //CHECK IN OBJECT
    const CheckIncludesInObject = (Item, What, Key) => {
        return What?.find(option => option.id === Item.id)
    }



    const Requests = props.Requests.filter(Request => {
        //FILTER
        const RequestType = GetFromStoreWithId("RequestsTypes", Request.Type.id)

        const CurrentUserAssigned = RequestType.Assigments.some(objeto => objeto.Email === (props.CurrentUser?.Email))



        return (
            (FiltroDeTexto === '' ||
                CheckIncludesText(Request.Title) ||
                CheckIncludesText(Request.Desc) ||
                CheckIncludesText(GetNameFromStoreWithId("Sectors", Request.Sector.id)) ||
                CheckIncludesText(GetNameFromStoreWithId("RequestsTypes", Request.Type.id)) ||
                CheckIncludesText(GetNameFromStoreWithId("Users", Request.CreatedBy)) ||
                CheckIncludesText(GetNameFromStoreWithId("Assets", Request.AssetId)) ||
                CheckIncludesText(GetNameFromStoreWithId("Users", Request.UserId)) ||
                CheckIncludesText(GetNameFromStoreWithId("RequestsStatus", Request.Status.id)) ||
                CheckIncludesText(GetNameFromStoreWithId("RequestsTypes", Request.Type.id))
            ) &&
            CheckIncludesInObject(Request.Type, Filters?.RequestsTypes) &&
            CheckIncludesInObject(Request.Sector, Filters?.Sectors) &&
            CheckIncludesInObject(Request.Status, Filters?.RequestsStatus
            ) &&

            ((key === 'AllRequests' && CurrentUserAssigned) || (key === 'MyRequests' && Request.CreatedBy === props.CurrentUser?.id) || (Request.CreatedBy === props.CurrentUser?.id))

        )
    }).sort(
        (Primeiro, Segundo) => {

            const StatusPrimeiro = GetNameFromStoreWithId('RequestsStatus', Primeiro.Status.id)
            const StatusSegundo = GetNameFromStoreWithId('RequestsStatus', Segundo.Status.id)
            const TypePrimeiro = GetNameFromStoreWithId('RequestsTypes', Primeiro.Type.id)
            const TypeSegundo = GetNameFromStoreWithId('RequestsTypes', Segundo.Type.id)
            const SectorPrimeiro = GetNameFromStoreWithId('Sectors', Primeiro.Sector.id)
            const SectorSegundo = GetNameFromStoreWithId('Sectors', Segundo.Sector.id)
            const RequesterNamePrimeiro = GetNameFromStoreWithId('Users', Primeiro.CreatedBy)
            const RequesterNameSegundo = GetNameFromStoreWithId('Users', Segundo.CreatedBy)


            switch (OrdenarPor) {
                case 'Titulo':
                    return Primeiro.Title.localeCompare(Segundo.Title)
                case 'Nome Solicitante':
                    return RequesterNamePrimeiro.localeCompare(RequesterNameSegundo)
                case 'Status da Solicitação':
                    return StatusPrimeiro.localeCompare(StatusSegundo)
                case 'Tipo de Solicitação':
                    return TypePrimeiro.localeCompare(TypeSegundo)
                case 'Setor':
                    return SectorPrimeiro.localeCompare(SectorSegundo)
                case 'Data de Solicitação':
                    return Primeiro.CreatedAt < Segundo.CreatedAt ? 1 : -1
                case 'Última edição':
                    return Primeiro.LastEditedAt < Segundo.LastEditedAt ? 1 : -1
                default:
                    return Primeiro.CreatedAt < Segundo.CreatedAt ? 1 : -1
            }
        }
    )


    return (

        <>
            {/********  OPEN REQUEST MODAL   *******/}
            <AddRequestModal show={AddRequestModalOpen} onHide={() => setAddRequestModalOpen(false)} />

            {SelectedRequest.Title &&
                <RequestModal
                    Request={{ ...SelectedRequest }}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            }
            <div className={props.Tema === 'Dark' ? 'AssetRequests-ContainerDark AssetRequests-Container' : 'AssetRequests-ContainerLightTheme AssetRequests-Container'} >



                <TabsContainer Direction="row" Tema={props.Tema}>
                    <TabButton ButtonName="AllRequests" Key={key} onClick={(k) => SetKeyConfig('AllRequests')} />
                    <TabButton ButtonName="MyRequests" Key={key} onClick={(k) => SetKeyConfig('MyRequests')} />
                </TabsContainer>


                <SectionTitle>Lista de Solicitações</SectionTitle>



                <div className='RequestsFormFilter'>

                    <input value={FiltroDeTexto} placeholder='Procurar Solicitação...' onChange={e => setFiltroDeTexto(e.target.value)}></input>
                    <FilterSelect Module="FilterRequests" OnChange={setFilters} />
                    <OrderBy
                        Module="Requests"
                        OnChange={(SelectedOption) => setOrdenarPor(SelectedOption.Value)}
                        Reset={ResetFilters}
                    />
                </div>

                <Info Text="Exibindo Somente as Solicitações que você é responsável ou que você abriu" />

                <Show Show={Requests.length !== 0 || Loaded}>
                    {Requests.map((Item) =>
                        <div key={v4()} onClick={e => handleRequestClick(Item)}>
                            <Request Request={Item} key={v4()} />
                        </div>
                    )}
                </Show>

                {/********  OPEN REQUEST BUTTON   *******/}
                <Show Show={PermitToOpenRequests}>
                    <button className='RequestsListAddUserButton' onClick={e => setAddRequestModalOpen(true)}>
                        Abrir Solicitação
                    </button>
                </Show>


                <Show Show={Requests.length === 0 && !Loaded}>
                    <Loading />
                </Show>

                <Show Show={Requests.length === 0 && Loaded}>
                    <Warning Text='Nenhuma Solicitação encontrada' />
                </Show>

            </div>




        </>



    )
}


const ConnectedRequests = connect((state) => {
    return {
        Tema: state.Tema,
        CurrentUser: state.CurrentUser,
        Requests: state.Requests
    }
})(Requests)

export default ConnectedRequests  