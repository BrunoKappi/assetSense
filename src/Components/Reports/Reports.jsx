import React, { useState, useEffect } from 'react';
import './Reports.css';
import { connect } from 'react-redux';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import {
  GetFromStore,
  GetFromStoreWithId,
  GetNameFromStoreWithId,
  GetNamesOfUsersThatTookAsset
} from '../../Functions/StoreMiddleware';
import FilterSelect from '../LayoutComponents/FilterSelect/FilterSelect';
import OrderBy from '../LayoutComponents/OrderBy/OrderBy';
import RangePicker from '../LayoutComponents/RangePicker/RangePicker';
import FormGroupLabel from '../LayoutComponents/FormGroupLabel/FormGroupLabel';
import TabsContainer from '../LayoutComponents/TabsContainer/TabsContainer';
import TabButton from '../LayoutComponents/TabButton/TabButton';
import SectionTitle from '../LayoutComponents/SectionTitle/SectionTitle';
import Warning from '../LayoutComponents/Warning/Warning';
import Show from '../LayoutComponents/Show/Show';
import Loading from '../LoadingForTabs/Loading';

// Icons
import { UilCalendarAlt, UilSearch } from '@iconscout/react-unicons';
import { FaFileCsv, FaPrint } from 'react-icons/fa';

function GetUserName(item, who) {
  if (who === 'For')
    return GetNameFromStoreWithId('UsersWithDeleted', item.TakenFor.id);
  else if (who === 'By')
    return GetNameFromStoreWithId('UsersWithDeleted', item.TakenBy.id);
}

function GetAssetName(item) {
  return GetNameFromStoreWithId('AssetsWithDeleted', item.AtivoId);
}

function GetUsage(item) {
  if (!item.ReturnDate) {
    return moment().valueOf() - item.TakeDate;
  }
  return item.ReturnDate - item.TakeDate;
}

function GetStatus(item) {
  return item.ReturnDate ? 'Devolvido' : 'Em uso';
}

const Reports = (props) => {
  // Tabs: 'ativos' | 'usuarios' | 'registros'
  const [activeTab, setActiveTab] = useState('ativos');
  
  // Filtering & Ordering States
  const [filtroDeTexto, setFiltroDeTexto] = useState('');
  const [filters, setFilters] = useState({});
  const [ordenarPor, setOrdenarPor] = useState('');
  const [resetFilters, setResetFilters] = useState(false);

  // Date Range (for Records)
  const today = new Date();
  const initDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
  const endDateInit = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const [startDate, setStartDate] = useState(initDate);
  const [endDate, setEndDate] = useState(endDateInit);

  // Loading state simulation for smooth updates
  const [loaded, setLoaded] = useState(true);

  // Reset filters and order when changing tab
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setFiltroDeTexto('');
    setFilters({});
    setOrdenarPor(tabName === 'ativos' ? 'Nome do Ativo' : tabName === 'usuarios' ? 'Nome' : 'Mais Recentes');
    
    // Trigger component remount for FilterSelect and OrderBy by using a key
    setResetFilters(true);
    setTimeout(() => {
      setResetFilters(false);
    }, 100);
  };

  // Helper check methods
  const checkIncludesText = (what) => {
    if (!what) return false;
    return what.toLowerCase().includes(filtroDeTexto.trim().toLowerCase());
  };

  const checkIncludesInObject = (item, selectList) => {
    if (!selectList || selectList.length === 0) return true;
    return selectList.find((option) => option.id === item?.id);
  };

  // Process Filtered Data Lists
  // 1. Assets
  const getFilteredAssets = () => {
    return props.Assets.filter((asset) => {
      const activeUsers = GetNamesOfUsersThatTookAsset(asset.id) || '';
      return (
        (filtroDeTexto === '' ||
          checkIncludesText(asset.Item) ||
          checkIncludesText(asset.Brand) ||
          checkIncludesText(asset.Description) ||
          checkIncludesText(activeUsers)) &&
        checkIncludesInObject(asset.Type, filters?.AssetTypes) &&
        checkIncludesInObject(asset.StorageLocation, filters?.StorageLocations) &&
        checkIncludesInObject(asset.Status, filters?.AssetsStatus) &&
        checkIncludesInObject(asset.Usage, filters?.UsageTypes)
      );
    }).sort((a, b) => {
      const usersA = GetNamesOfUsersThatTookAsset(a.id) || 'ZZ';
      const usersB = GetNamesOfUsersThatTookAsset(b.id) || 'ZZ';
      const storageA = GetNameFromStoreWithId('StorageLocations', a.StorageLocation.id);
      const storageB = GetNameFromStoreWithId('StorageLocations', b.StorageLocation.id);
      const typeA = GetNameFromStoreWithId('AssetTypes', a.Type.id);
      const typeB = GetNameFromStoreWithId('AssetTypes', b.Type.id);

      switch (ordenarPor) {
        case 'Nome do Ativo':
          return a.Item.localeCompare(b.Item);
        case 'Nome do Usuário':
          return usersA.localeCompare(usersB);
        case 'Local de Armazenamento':
          return storageA.localeCompare(storageB);
        case 'Tipo':
          return typeA.localeCompare(typeB);
        case 'Quantidade do Ativo':
          return parseInt(b.Qtd) - parseInt(a.Qtd);
        case 'Quantidade em Uso':
          return parseInt(b.QtdInUse) - parseInt(a.QtdInUse);
        case 'Data de Adição':
          return b.CreatedAt - a.CreatedAt;
        case 'Última edição':
          return b.LastEditedAt - a.LastEditedAt;
        default:
          return a.Item.localeCompare(b.Item);
      }
    });
  };

  // 2. Users
  const getFilteredUsers = () => {
    return props.Users.filter((user) => {
      const sector = GetNameFromStoreWithId('Sectors', user.Sector?.id) || '';
      const type = GetNameFromStoreWithId('UserTypes', user.Type?.id) || '';
      return (
        (filtroDeTexto === '' ||
          checkIncludesText(user.Name) ||
          checkIncludesText(user.LastName) ||
          checkIncludesText(user.Email) ||
          checkIncludesText(sector) ||
          checkIncludesText(type)) &&
        checkIncludesInObject(user.Sector, filters?.Sectors) &&
        checkIncludesInObject(user.Type, filters?.UserTypes)
      );
    }).sort((a, b) => {
      const sectorA = GetNameFromStoreWithId('Sectors', a.Sector?.id);
      const sectorB = GetNameFromStoreWithId('Sectors', b.Sector?.id);
      const typeA = GetNameFromStoreWithId('UserTypes', a.Type?.id);
      const typeB = GetNameFromStoreWithId('UserTypes', b.Type?.id);

      switch (ordenarPor) {
        case 'Nome':
          return a.Name.localeCompare(b.Name);
        case 'Email':
          return a.Email.localeCompare(b.Email);
        case 'Setor':
          return sectorA.localeCompare(sectorB);
        case 'Tipo':
          return typeA.localeCompare(typeB);
        case 'Data de Adição':
          return b.CreatedAt - a.CreatedAt;
        case 'Última edição':
          return b.LastEditedAt - a.LastEditedAt;
        default:
          return a.Name.localeCompare(b.Name);
      }
    });
  };

  // 3. Records
  const getFilteredRecords = () => {
    return props.RecordsAssets.filter((record) => {
      const forName = GetUserName(record, 'For') || '';
      const byName = GetUserName(record, 'By') || '';
      const assetName = GetAssetName(record) || '';
      const status = GetStatus(record);
      const takeDateStr = record.TakeDate ? moment(record.TakeDate).format('DD/MM/YY') : '';
      const returnDateStr = record.ReturnDate ? moment(record.ReturnDate).format('DD/MM/YY') : '';

      const asset = GetFromStoreWithId('Assets', record.AtivoId);
      const user = GetFromStoreWithId('Users', record.TakenFor.id);

      return (
        (filtroDeTexto === '' ||
          checkIncludesText(forName) ||
          checkIncludesText(byName) ||
          checkIncludesText(assetName) ||
          checkIncludesText(status) ||
          checkIncludesText(takeDateStr) ||
          checkIncludesText(returnDateStr)) &&
        (!asset || checkIncludesInObject(asset.Type, filters?.AssetTypes)) &&
        (!asset || checkIncludesInObject(asset.StorageLocation, filters?.StorageLocations)) &&
        (!asset || checkIncludesInObject(asset.Status, filters?.AssetsStatus)) &&
        (!asset || checkIncludesInObject(asset.Usage, filters?.UsageTypes)) &&
        (!user || checkIncludesInObject(user.Sector, filters?.Sectors)) &&
        (!user || checkIncludesInObject(user.Type, filters?.UserTypes)) &&
        record.TakeDate >= moment(startDate).startOf('day').valueOf() &&
        record.TakeDate <= moment(endDate).endOf('day').valueOf()
      );
    }).sort((a, b) => {
      const forNameA = GetUserName(a, 'For') || '';
      const forNameB = GetUserName(b, 'For') || '';
      const usageA = GetUsage(a);
      const usageB = GetUsage(b);
      const statusA = GetStatus(a);
      const statusB = GetStatus(b);

      switch (ordenarPor) {
        case 'Mais Recentes':
          return b.TakeDate - a.TakeDate;
        case 'Mais Antigos':
          return a.TakeDate - b.TakeDate;
        case 'Nome':
          return forNameA.localeCompare(forNameB);
        case 'Tempo de Uso':
          return usageB - usageA;
        case 'Status':
          return statusB.localeCompare(statusA);
        default:
          return b.TakeDate - a.TakeDate;
      }
    });
  };

  const filteredAssets = getFilteredAssets();
  const filteredUsers = getFilteredUsers();
  const filteredRecords = getFilteredRecords();

  // Export to CSV
  const handleExportCSV = () => {
    let headers = [];
    let rows = [];
    const filename = `relatorio_${activeTab}_${moment().format('YYYY-MM-DD_HH-mm')}.csv`;

    if (activeTab === 'ativos') {
      headers = ['Nome do Ativo', 'Marca', 'Tipo', 'Local de Armazenamento', 'Status', 'Tipo de Uso', 'Qtd Total', 'Qtd em Uso'];
      rows = filteredAssets.map((item) => [
        item.Item || '',
        item.Brand || '',
        GetNameFromStoreWithId('AssetTypes', item.Type?.id) || '',
        GetNameFromStoreWithId('StorageLocations', item.StorageLocation?.id) || '',
        GetNameFromStoreWithId('AssetsStatus', item.Status?.id) || '',
        GetNameFromStoreWithId('UsageTypes', item.Usage?.id) || '',
        item.Qtd || 0,
        item.QtdInUse || 0
      ]);
    } else if (activeTab === 'usuarios') {
      headers = ['Nome', 'Sobrenome', 'E-mail', 'Setor', 'Tipo de Usuário'];
      rows = filteredUsers.map((item) => [
        item.Name || '',
        item.LastName || '',
        item.Email || '',
        GetNameFromStoreWithId('Sectors', item.Sector?.id) || '',
        GetNameFromStoreWithId('UserTypes', item.Type?.id) || ''
      ]);
    } else if (activeTab === 'registros') {
      headers = ['Ativo', 'Retirado por', 'Retirado em', 'Devolvido em', 'Status', 'Registrado por'];
      rows = filteredRecords.map((item) => [
        GetNameFromStoreWithId('AssetsWithDeleted', item.AtivoId) || '',
        GetNameFromStoreWithId('UsersWithDeleted', item.TakenFor?.id) || '',
        item.TakeDate ? moment(item.TakeDate).format('DD/MM/YYYY HH:mm') : '',
        item.ReturnDate ? moment(item.ReturnDate).format('DD/MM/YYYY HH:mm') : 'Em uso',
        item.ReturnDate ? 'Devolvido' : 'Em uso',
        GetNameFromStoreWithId('UsersWithDeleted', item.TakenBy?.id) || ''
      ]);
    }

    const csvContent = '\uFEFF' + [
      headers.join(';'),
      ...rows.map((row) => row.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(';'))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print/PDF Handler
  const handlePrint = () => {
    window.print();
  };

  // Metrics calculators
  const getAssetsMetrics = () => {
    const total = filteredAssets.reduce((sum, item) => sum + parseInt(item.Qtd || 0), 0);
    const inUse = filteredAssets.reduce((sum, item) => sum + parseInt(item.QtdInUse || 0), 0);
    return {
      total,
      inUse,
      available: total - inUse
    };
  };

  const getUsersMetrics = () => {
    const total = filteredUsers.length;
    const sectors = new Set(filteredUsers.map((u) => u.Sector?.id).filter(Boolean)).size;
    const admins = filteredUsers.filter((u) => {
      const type = GetNameFromStoreWithId('UserTypes', u.Type?.id) || '';
      return type.toLowerCase().includes('adm') || type.toLowerCase().includes('admin');
    }).length;
    return { total, sectors, admins };
  };

  const getRecordsMetrics = () => {
    const total = filteredRecords.length;
    const pending = filteredRecords.filter((r) => !r.ReturnDate).length;
    return {
      total,
      pending,
      returned: total - pending
    };
  };

  const assetMetrics = getAssetsMetrics();
  const userMetrics = getUsersMetrics();
  const recordMetrics = getRecordsMetrics();

  return (
    <div className={props.Tema === 'Dark' ? 'ReportsContainerDark ReportsContainer' : 'ReportsContainerLightTheme ReportsContainer'}>
      
      {/* Tab controls */}
      <div className="no-print">
        <TabsContainer Direction="row" Tema={props.Tema}>
          <TabButton ButtonName="Ativos" Key={activeTab === 'ativos' ? 'Ativos' : ''} onClick={() => handleTabChange('ativos')} />
          <TabButton ButtonName="Usuários" Key={activeTab === 'usuarios' ? 'Usuários' : ''} onClick={() => handleTabChange('usuarios')} />
          <TabButton ButtonName="Registros" Key={activeTab === 'registros' ? 'Registros' : ''} onClick={() => handleTabChange('registros')} />
        </TabsContainer>
      </div>

      <div className="Reports-PrintArea">
        <div className="Reports-Header">
          <SectionTitle>Relatórios de Gestão</SectionTitle>
          <p className="Reports-Subtitle">
            Gerado em {moment().format('DD/MM/YYYY [às] HH:mm')} | Relatório de {activeTab === 'ativos' ? 'Ativos' : activeTab === 'usuarios' ? 'Usuários' : 'Registros'}
          </p>
        </div>

        {/* Action button bar */}
        <div className="Reports-ActionBar no-print">
          <button className="Reports-ActionButton CSVButton" onClick={handleExportCSV}>
            <FaFileCsv className="icon" /> Exportar CSV
          </button>
          <button className="Reports-ActionButton PrintButton" onClick={handlePrint}>
            <FaPrint className="icon" /> Imprimir / PDF
          </button>
        </div>

        {/* Filter controls */}
        <div className="Reports-Filters-Container no-print">
          <div className="Reports-SearchGroup">
            <FormGroupLabel>
              <UilSearch />
              Buscar por Palavra-chave
            </FormGroupLabel>
            <input
              type="text"
              value={filtroDeTexto}
              placeholder="Digite para filtrar..."
              onChange={(e) => setFiltroDeTexto(e.target.value)}
              className="Reports-SearchInput"
            />
          </div>

          {activeTab === 'registros' && (
            <div className="Reports-DateRangeGroup">
              <div className="Reports-DateRangeContainer">
                <FormGroupLabel>
                  <UilCalendarAlt />
                  Data de Início
                </FormGroupLabel>
                <RangePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                />
              </div>
              <div className="Reports-DateRangeContainer">
                <FormGroupLabel>
                  <UilCalendarAlt />
                  Data Final
                </FormGroupLabel>
                <RangePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                />
              </div>
            </div>
          )}

          <div className="Reports-OrderFilterGroup">
            {!resetFilters && (
              <>
                <FilterSelect
                  key={`filter-${activeTab}`}
                  Module={activeTab === 'ativos' ? 'FilterAssets' : activeTab === 'usuarios' ? 'FilterUsers' : 'FilterRecords'}
                  OnChange={setFilters}
                />
                <OrderBy
                  key={`order-${activeTab}`}
                  Module={activeTab === 'ativos' ? 'Assets' : activeTab === 'usuarios' ? 'Users' : 'Records'}
                  OnChange={(opt) => setOrdenarPor(opt.Value)}
                  Reset={resetFilters}
                />
              </>
            )}
          </div>
        </div>

        {/* Metrics Overview Cards */}
        <div className="Reports-SummaryGrid">
          {activeTab === 'ativos' && (
            <>
              <div className="Reports-Card">
                <div className="Reports-Card-Number">{assetMetrics.total}</div>
                <div className="Reports-Card-Label">Quantidade Total de Ativos</div>
              </div>
              <div className="Reports-Card">
                <div className="Reports-Card-Number">{assetMetrics.inUse}</div>
                <div className="Reports-Card-Label">Ativos Atualmente Em Uso</div>
              </div>
              <div className="Reports-Card">
                <div className="Reports-Card-Number">{assetMetrics.available}</div>
                <div className="Reports-Card-Label">Ativos Disponíveis</div>
              </div>
            </>
          )}

          {activeTab === 'usuarios' && (
            <>
              <div className="Reports-Card">
                <div className="Reports-Card-Number">{userMetrics.total}</div>
                <div className="Reports-Card-Label">Total de Usuários</div>
              </div>
              <div className="Reports-Card">
                <div className="Reports-Card-Number">{userMetrics.sectors}</div>
                <div className="Reports-Card-Label">Setores Ativos</div>
              </div>
              <div className="Reports-Card">
                <div className="Reports-Card-Number">{userMetrics.admins}</div>
                <div className="Reports-Card-Label">Administradores</div>
              </div>
            </>
          )}

          {activeTab === 'registros' && (
            <>
              <div className="Reports-Card">
                <div className="Reports-Card-Number">{recordMetrics.total}</div>
                <div className="Reports-Card-Label">Movimentações no Período</div>
              </div>
              <div className="Reports-Card">
                <div className="Reports-Card-Number">{recordMetrics.pending}</div>
                <div className="Reports-Card-Label">Retiradas Pendentes (Em uso)</div>
              </div>
              <div className="Reports-Card">
                <div className="Reports-Card-Number">{recordMetrics.returned}</div>
                <div className="Reports-Card-Label">Devoluções Registradas</div>
              </div>
            </>
          )}
        </div>

        {/* Data Table */}
        <div className="Reports-TableWrapper">
          <Show Show={loaded}>
            {activeTab === 'ativos' && filteredAssets.length > 0 && (
              <table className="Reports-Table">
                <thead>
                  <tr>
                    <th>Ativo</th>
                    <th>Marca</th>
                    <th>Tipo</th>
                    <th>Armazenamento</th>
                    <th>Status</th>
                    <th>Uso</th>
                    <th>Total</th>
                    <th>Em Uso</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAssets.map((asset) => (
                    <tr key={asset.id || uuidv4()}>
                      <td className="bold">{asset.Item}</td>
                      <td>{asset.Brand || '-'}</td>
                      <td>{GetNameFromStoreWithId('AssetTypes', asset.Type?.id) || '-'}</td>
                      <td>{GetNameFromStoreWithId('StorageLocations', asset.StorageLocation?.id) || '-'}</td>
                      <td>
                        <span className={`status-badge status-${(GetNameFromStoreWithId('AssetsStatus', asset.Status?.id) || '').toLowerCase()}`}>
                          {GetNameFromStoreWithId('AssetsStatus', asset.Status?.id) || '-'}
                        </span>
                      </td>
                      <td>{GetNameFromStoreWithId('UsageTypes', asset.Usage?.id) || '-'}</td>
                      <td>{asset.Qtd}</td>
                      <td>{asset.QtdInUse}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'usuarios' && filteredUsers.length > 0 && (
              <table className="Reports-Table">
                <thead>
                  <tr>
                    <th>Nome Completo</th>
                    <th>E-mail</th>
                    <th>Setor</th>
                    <th>Tipo de Usuário</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id || uuidv4()}>
                      <td className="bold">{user.Name} {user.LastName}</td>
                      <td>{user.Email}</td>
                      <td>{GetNameFromStoreWithId('Sectors', user.Sector?.id) || '-'}</td>
                      <td>{GetNameFromStoreWithId('UserTypes', user.Type?.id) || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'registros' && filteredRecords.length > 0 && (
              <table className="Reports-Table">
                <thead>
                  <tr>
                    <th>Ativo</th>
                    <th>Retirado por</th>
                    <th>Retirado em</th>
                    <th>Devolvido em</th>
                    <th>Status</th>
                    <th>Registrado por</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record) => (
                    <tr key={record.id || uuidv4()}>
                      <td className="bold">{GetNameFromStoreWithId('AssetsWithDeleted', record.AtivoId) || '-'}</td>
                      <td>{GetNameFromStoreWithId('UsersWithDeleted', record.TakenFor?.id) || '-'}</td>
                      <td>{record.TakeDate ? moment(record.TakeDate).format('DD/MM/YYYY HH:mm') : '-'}</td>
                      <td>{record.ReturnDate ? moment(record.ReturnDate).format('DD/MM/YYYY HH:mm') : '-'}</td>
                      <td>
                        <span className={`status-badge record-${record.ReturnDate ? 'returned' : 'pending'}`}>
                          {record.ReturnDate ? 'Devolvido' : 'Em Uso'}
                        </span>
                      </td>
                      <td>{GetNameFromStoreWithId('UsersWithDeleted', record.TakenBy?.id) || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Empty Warnings */}
            {activeTab === 'ativos' && filteredAssets.length === 0 && (
              <Warning Text="Nenhum ativo encontrado para os filtros selecionados." />
            )}
            {activeTab === 'usuarios' && filteredUsers.length === 0 && (
              <Warning Text="Nenhum usuário encontrado para os filtros selecionados." />
            )}
            {activeTab === 'registros' && filteredRecords.length === 0 && (
              <Warning Text="Nenhum registro de movimentação encontrado no período." />
            )}
          </Show>

          <Show Show={!loaded}>
            <Loading />
          </Show>
        </div>
      </div>
    </div>
  );
};

const ConnectedReports = connect((state) => {
  return {
    Tema: state.Tema,
    Assets: state.Assets,
    Users: state.Users,
    RecordsAssets: state.RecordsAssets,
    Sectors: state.Sectors,
    UserTypes: state.UserTypes,
    StorageLocations: state.StorageLocations,
    AssetsStatus: state.AssetsStatus,
    UsageTypes: state.UsageTypes
  };
})(Reports);

export default ConnectedReports;
