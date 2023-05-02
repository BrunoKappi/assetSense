import React, { useState, useEffect } from 'react'
import './Requests.css'
import { GetFromStore } from '../../Functions/StoreMiddleware';
import AddRequestModal from './AddRequestModal/AddRequestModal'
import { connect } from 'react-redux'
import Show from '../LayoutComponents/Show/Show'
import { PermitIndexs } from '../../GlobalVars';
import Loading from '../LoadingForTabs/Loading';
import Warning from '../LayoutComponents/Warning/Warning';
import SectionTitle from '../LayoutComponents/SectionTitle/SectionTitle';
import FilterSelect from '../LayoutComponents/FilterSelect/FilterSelect'
import OrderBy from '../LayoutComponents/OrderBy/OrderBy'
import Request from './Request/Request'
import { v4 } from 'uuid';

const Requests = (props) => {

    const CurrentUser = GetFromStore('CurrentUser')
    const CurrentType = GetFromStore('CurrentUserType')
    const [AddRequestModalOpen, setAddRequestModalOpen] = useState(false);
    const [Requests, setRequests] = useState([]);
    const [Loaded, setLoaded] = useState(false);

    //FILTERS
    const [FiltroDeTexto, setFiltroDeTexto] = useState('');
    const [Filters, setFilters] = useState([]);
    const [ResetFilters, setResetFilters] = useState(false);
    const [OrdenarPor, setOrdenarPor] = useState('Data de Solicitação');

    useEffect(() => {
        setRequests(GetFromStore('Requests'))
        setTimeout(() => {
            setLoaded(true)
        }, 500);
    }, [])


    //PERMITS E USER TYPE   
    var PermitToOpenRequests = CurrentType?.Permits[PermitIndexs['OPEN_REQUESTS']]



    //USER CLICK
    const handleRequestClick = (RequestClicked) => {
        setModalShow(true);
        setSelectedUser({ ...RequestClicked });
    }

    return (

        <>
            {/********  OPEN REQUEST MODAL   *******/}
            <AddRequestModal show={AddRequestModalOpen} onHide={() => setAddRequestModalOpen(false)} />

            <div className={props.Tema === 'Escuro' ? 'AssetRequests-ContainerEscuro AssetRequests-Container' : 'AssetRequests-ContainerClaro AssetRequests-Container'} >

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
        Tema: state.Tema
    }
})(Requests)

export default ConnectedRequests  