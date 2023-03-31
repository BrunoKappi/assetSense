import React from 'react'
import { useEffect, useState } from 'react';
import Masonry from "react-masonry-css";
import { connect } from 'react-redux'
import { PermitDesc, PermitIndexs } from '../../GlobalVars';
import './UserTypesPermits.css'
import { Tooltip } from 'react-tippy';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'
import { EditUserType, SaveUserTipos } from '../../Functions/Middleware';
import { v4 } from 'uuid';
import { NotificationErro, NotificationSucesso } from '../../NotificationUtils';

const breakpointColumnsObj = {
    default: 3,
    1250: 2,
    950: 1,
    700: 1
};

const UserTypesPermits = (props) => {

    const [TiposUsuarios, setTiposUsuarios] = useState([...props.TiposUsuarios])

    useEffect(() => {
        setTiposUsuarios([...props.TiposUsuarios])
    }, [props.TiposUsuarios])



    const CheckUsuarioBlock = (TiposCopy, TipoIndex, PermitIndex) => {
        //////////// ========= LOGICA DO BLOCO DE USUARIOS ============ //////////////////
        // SE DESMACAR ALGUMA OPÇÃO DENTRO DESMARCA A DE FORA
        if ((!TiposCopy[TipoIndex].Permits[PermitIndexs['ADICIONAR_USUARIOS']]
            || !TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_USUARIOS']]
            || !TiposCopy[TipoIndex].Permits[PermitIndexs['EXCLUIR_USUARIOS']]
            || !TiposCopy[TipoIndex].Permits[PermitIndexs['VISUALIZAR_USUARIOS']]
        ) && (PermitIndex === PermitIndexs['ADICIONAR_USUARIOS'] || PermitIndex === PermitIndexs['EDITAR_USUARIOS'] || PermitIndex === PermitIndexs['EXCLUIR_USUARIOS'] || PermitIndex === PermitIndexs['VISUALIZAR_USUARIOS'])
        ) {
            TiposCopy[TipoIndex].Permits[PermitIndexs['USUARIOS']] = false
        }
        // SE MARCAR TODAS, MARCA O DE FORA
        if ((TiposCopy[TipoIndex].Permits[PermitIndexs['ADICIONAR_USUARIOS']]
            && TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_USUARIOS']]
            && TiposCopy[TipoIndex].Permits[PermitIndexs['EXCLUIR_USUARIOS']]
            && TiposCopy[TipoIndex].Permits[PermitIndexs['VISUALIZAR_USUARIOS']]
        ) && (PermitIndex === PermitIndexs['ADICIONAR_USUARIOS'] || PermitIndex === PermitIndexs['EDITAR_USUARIOS'] || PermitIndex === PermitIndexs['EXCLUIR_USUARIOS'] || PermitIndex === PermitIndexs['VISUALIZAR_USUARIOS'])
        ) {
            TiposCopy[TipoIndex].Permits[PermitIndexs['USUARIOS']] = true
        }
        // SE MARCAR A OPÇÂO DO USUARIO, MARCA TODOS DENTRO
        if (PermitIndex === PermitIndexs['USUARIOS'] && TiposCopy[TipoIndex].Permits[PermitIndexs['USUARIOS']] === true) {
            TiposCopy[TipoIndex].Permits[PermitIndexs['ADICIONAR_USUARIOS']] = true
            TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_USUARIOS']] = true
            TiposCopy[TipoIndex].Permits[PermitIndexs['EXCLUIR_USUARIOS']] = true
            TiposCopy[TipoIndex].Permits[PermitIndexs['VISUALIZAR_USUARIOS']] = true
        }
        // SE DESMARCAR A OPÇÂO DO USUARIO, DESMARCA TODOS DENTRO
        if (PermitIndex === PermitIndexs['USUARIOS'] && TiposCopy[TipoIndex].Permits[PermitIndexs['USUARIOS']] === false) {
            TiposCopy[TipoIndex].Permits[PermitIndexs['ADICIONAR_USUARIOS']] = false
            TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_USUARIOS']] = false
            TiposCopy[TipoIndex].Permits[PermitIndexs['EXCLUIR_USUARIOS']] = false
            TiposCopy[TipoIndex].Permits[PermitIndexs['VISUALIZAR_USUARIOS']] = false
        }
        //////////// ========= LOGICA DO BLOCO DE USUARIOS ============ //////////////////
        return TiposCopy
    }

    const CheckAtivosBlock = (TiposCopy, TipoIndex, PermitIndex) => {
        //////////// ========= LOGICA DO BLOCO DE ATIVOS ============ //////////////////
        // SE DESMACAR ALGUMA OPÇÃO DENTRO DESMARCA A DE FORA
        if ((!TiposCopy[TipoIndex].Permits[PermitIndexs['ADICIONAR_ATIVOS']]
            || !TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_ATIVOS']]
            || !TiposCopy[TipoIndex].Permits[PermitIndexs['EXCLUIR_ATIVOS']]
            || !TiposCopy[TipoIndex].Permits[PermitIndexs['VISUALIZAR_ATIVOS']]
            || !TiposCopy[TipoIndex].Permits[PermitIndexs['RETIRAR_ATIVOS']]
        ) && (PermitIndex === PermitIndexs['VISUALIZAR_ATIVOS'] || PermitIndex === PermitIndexs['RETIRAR_ATIVOS'] || PermitIndex === PermitIndexs['ADICIONAR_ATIVOS'] || PermitIndex === PermitIndexs['EDITAR_ATIVOS'] || PermitIndex === PermitIndexs['EXCLUIR_ATIVOS'])
        ) {
            TiposCopy[TipoIndex].Permits[PermitIndexs['ATIVOS']] = false
        }
        // SE MARCAR TODAS, MARCA O DE FORA
        if ((TiposCopy[TipoIndex].Permits[PermitIndexs['ADICIONAR_ATIVOS']]
            && TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_ATIVOS']]
            && TiposCopy[TipoIndex].Permits[PermitIndexs['EXCLUIR_ATIVOS']]
            && TiposCopy[TipoIndex].Permits[PermitIndexs['VISUALIZAR_ATIVOS']]
            && TiposCopy[TipoIndex].Permits[PermitIndexs['RETIRAR_ATIVOS']]
        ) && (PermitIndex === PermitIndexs['VISUALIZAR_ATIVOS'] || PermitIndex === PermitIndexs['RETIRAR_ATIVOS'] || PermitIndex === PermitIndexs['ADICIONAR_ATIVOS'] || PermitIndex === PermitIndexs['EDITAR_ATIVOS'] || PermitIndex === PermitIndexs['EXCLUIR_ATIVOS'])
        ) {
            TiposCopy[TipoIndex].Permits[PermitIndexs['ATIVOS']] = true
        }
        // SE MARCAR A OPÇÂO DO USUARIO, MARCA TODOS DENTRO
        if (PermitIndex === PermitIndexs['ATIVOS'] && TiposCopy[TipoIndex].Permits[PermitIndexs['ATIVOS']] === true) {
            TiposCopy[TipoIndex].Permits[PermitIndexs['ADICIONAR_ATIVOS']] = true
            TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_ATIVOS']] = true
            TiposCopy[TipoIndex].Permits[PermitIndexs['EXCLUIR_ATIVOS']] = true
            TiposCopy[TipoIndex].Permits[PermitIndexs['VISUALIZAR_ATIVOS']] = true
            TiposCopy[TipoIndex].Permits[PermitIndexs['RETIRAR_ATIVOS']] = true
        }
        // SE DESMARCAR A OPÇÂO DO USUARIO, DESMARCA TODOS DENTRO
        if (PermitIndex === PermitIndexs['ATIVOS'] && TiposCopy[TipoIndex].Permits[PermitIndexs['ATIVOS']] === false) {
            TiposCopy[TipoIndex].Permits[PermitIndexs['ADICIONAR_ATIVOS']] = false
            TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_ATIVOS']] = false
            TiposCopy[TipoIndex].Permits[PermitIndexs['EXCLUIR_ATIVOS']] = false
            TiposCopy[TipoIndex].Permits[PermitIndexs['VISUALIZAR_ATIVOS']] = false
            TiposCopy[TipoIndex].Permits[PermitIndexs['RETIRAR_ATIVOS']] = false
        }
        //////////// ========= LOGICA DO BLOCO DE ATIVOS ============ //////////////////
        return TiposCopy
    }






    const CheckConfigBlock = (TiposCopy, TipoIndex, PermitIndex) => {
        //////////// ========= LOGICA DO BLOCO DE ATIVOS ============ //////////////////
        // SE DESMACAR ALGUMA OPÇÃO DENTRO DESMARCA A DE FORA
        if ((!TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_TIPOS_ATIVOS']]
            || !TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_LOCAIS']]
            || !TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_STATUS_ATIVOS']]
            || !TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_TIPOS_DE_USO']]
            || !TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_SETORES']]
            || !TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_TIPOS_DE_USUARIO']]
            || !TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_PERMICOES']]
        ) && (PermitIndex === PermitIndexs['EDITAR_TIPOS_ATIVOS'] || PermitIndex === PermitIndexs['EDITAR_LOCAIS'] || PermitIndex === PermitIndexs['EDITAR_STATUS_ATIVOS'] || PermitIndex === PermitIndexs['EDITAR_TIPOS_DE_USO'] || PermitIndex === PermitIndexs['EDITAR_SETORES'] || PermitIndex === PermitIndexs['EDITAR_TIPOS_DE_USUARIO'] || PermitIndex === PermitIndexs['EDITAR_PERMICOES'])
        ) {
            TiposCopy[TipoIndex].Permits[PermitIndexs['CONFIGURACOES']] = false
        }
        // SE MARCAR TODAS, MARCA O DE FORA
        if ((TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_TIPOS_ATIVOS']]
            && TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_LOCAIS']]
            && TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_STATUS_ATIVOS']]
            && TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_TIPOS_DE_USO']]
            && TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_SETORES']]
            && TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_TIPOS_DE_USUARIO']]
            && TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_PERMICOES']]
        ) && (PermitIndex === PermitIndexs['EDITAR_TIPOS_ATIVOS'] || PermitIndex === PermitIndexs['EDITAR_LOCAIS'] || PermitIndex === PermitIndexs['EDITAR_STATUS_ATIVOS'] || PermitIndex === PermitIndexs['EDITAR_TIPOS_DE_USO'] || PermitIndex === PermitIndexs['EDITAR_SETORES'] || PermitIndex === PermitIndexs['EDITAR_TIPOS_DE_USUARIO'] || PermitIndex === PermitIndexs['EDITAR_PERMICOES'])
        ) {
            TiposCopy[TipoIndex].Permits[PermitIndexs['CONFIGURACOES']] = true
        }
        // SE MARCAR A OPÇÂO DO USUARIO, MARCA TODOS DENTRO
        if (PermitIndex === PermitIndexs['CONFIGURACOES'] && TiposCopy[TipoIndex].Permits[PermitIndexs['CONFIGURACOES']] === true) {
            TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_TIPOS_ATIVOS']] = true
            TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_LOCAIS']] = true
            TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_STATUS_ATIVOS']] = true
            TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_TIPOS_DE_USO']] = true
            TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_SETORES']] = true
            TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_TIPOS_DE_USUARIO']] = true
            TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_PERMICOES']] = true
        }
        // SE DESMARCAR A OPÇÂO DO USUARIO, DESMARCA TODOS DENTRO
        if (PermitIndex === PermitIndexs['CONFIGURACOES'] && TiposCopy[TipoIndex].Permits[PermitIndexs['CONFIGURACOES']] === false) {
            TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_TIPOS_ATIVOS']] = false
            TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_LOCAIS']] = false
            TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_STATUS_ATIVOS']] = false
            TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_TIPOS_DE_USO']] = false
            TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_SETORES']] = false
            TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_TIPOS_DE_USUARIO']] = false
            TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_PERMICOES']] = false
        }
        //////////// ========= LOGICA DO BLOCO DE ATIVOS ============ //////////////////
        return TiposCopy
    }




    const CheckAllCheched = (TiposCopy, TipoIndex, PermitIndex) => {

        // SE TODOS ESTÂO MARCADOS
        if (TiposCopy[TipoIndex].Permits[PermitIndexs['CONFIGURACOES']]
            && TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_TIPOS_ATIVOS']]
            && TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_LOCAIS']]
            && TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_STATUS_ATIVOS']]
            && TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_TIPOS_DE_USO']]
            && TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_SETORES']]
            && TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_TIPOS_DE_USUARIO']]
            && TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_PERMICOES']]
            && TiposCopy[TipoIndex].Permits[PermitIndexs['ADICIONAR_ATIVOS']]
            && TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_ATIVOS']]
            && TiposCopy[TipoIndex].Permits[PermitIndexs['EXCLUIR_ATIVOS']]
            && TiposCopy[TipoIndex].Permits[PermitIndexs['ATIVOS']]
            && TiposCopy[TipoIndex].Permits[PermitIndexs['ADICIONAR_USUARIOS']]
            && TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_USUARIOS']]
            && TiposCopy[TipoIndex].Permits[PermitIndexs['EXCLUIR_USUARIOS']]
            && TiposCopy[TipoIndex].Permits[PermitIndexs['USUARIOS']]
            && TiposCopy[TipoIndex].Permits[PermitIndexs['VISUALIZAR_USUARIOS']]
            && TiposCopy[TipoIndex].Permits[PermitIndexs['VISUALIZAR_ATIVOS']]
            && TiposCopy[TipoIndex].Permits[PermitIndexs['RETIRAR_ATIVOS']]
        ) {
            TiposCopy[TipoIndex].IsAdmin = true
        }
        // SE TODOS ESTÂO MARCADOS
        else if (!TiposCopy[TipoIndex].Permits[PermitIndexs['CONFIGURACOES']]
            || !TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_TIPOS_ATIVOS']]
            || !TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_LOCAIS']]
            || !TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_STATUS_ATIVOS']]
            || !TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_TIPOS_DE_USO']]
            || !TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_SETORES']]
            || !TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_TIPOS_DE_USUARIO']]
            || !TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_PERMICOES']]
            || !TiposCopy[TipoIndex].Permits[PermitIndexs['ADICIONAR_ATIVOS']]
            || !TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_ATIVOS']]
            || !TiposCopy[TipoIndex].Permits[PermitIndexs['EXCLUIR_ATIVOS']]
            || !TiposCopy[TipoIndex].Permits[PermitIndexs['ATIVOS']]
            || !TiposCopy[TipoIndex].Permits[PermitIndexs['ADICIONAR_USUARIOS']]
            || !TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_USUARIOS']]
            || !TiposCopy[TipoIndex].Permits[PermitIndexs['EXCLUIR_USUARIOS']]
            || !TiposCopy[TipoIndex].Permits[PermitIndexs['USUARIOS']]
            || !TiposCopy[TipoIndex].Permits[PermitIndexs['VISUALIZAR_USUARIOS']]
            || !TiposCopy[TipoIndex].Permits[PermitIndexs['VISUALIZAR_ATIVOS']]
            || !TiposCopy[TipoIndex].Permits[PermitIndexs['RETIRAR_ATIVOS']]

        ) {
            TiposCopy[TipoIndex].IsAdmin = false
        }
        return TiposCopy

    }



    const CheckAdmin = (TipoIndex) => {

        var TiposCopy = [...props.TiposUsuarios]

        TiposCopy[TipoIndex].Permits[PermitIndexs['CONFIGURACOES']] = true
        TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_TIPOS_ATIVOS']] = true
        TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_LOCAIS']] = true
        TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_STATUS_ATIVOS']] = true
        TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_TIPOS_DE_USO']] = true
        TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_SETORES']] = true
        TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_TIPOS_DE_USUARIO']] = true
        TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_PERMICOES']] = true
        TiposCopy[TipoIndex].Permits[PermitIndexs['ADICIONAR_ATIVOS']] = true
        TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_ATIVOS']] = true
        TiposCopy[TipoIndex].Permits[PermitIndexs['EXCLUIR_ATIVOS']] = true
        TiposCopy[TipoIndex].Permits[PermitIndexs['ATIVOS']] = true
        TiposCopy[TipoIndex].Permits[PermitIndexs['ADICIONAR_USUARIOS']] = true
        TiposCopy[TipoIndex].Permits[PermitIndexs['EDITAR_USUARIOS']] = true
        TiposCopy[TipoIndex].Permits[PermitIndexs['EXCLUIR_USUARIOS']] = true
        TiposCopy[TipoIndex].Permits[PermitIndexs['USUARIOS']] = true
        TiposCopy[TipoIndex].Permits[PermitIndexs['VISUALIZAR_USUARIOS']] = true
        TiposCopy[TipoIndex].Permits[PermitIndexs['VISUALIZAR_ATIVOS']] = true
        TiposCopy[TipoIndex].Permits[PermitIndexs['RETIRAR_ATIVOS']] = true

        TiposCopy[TipoIndex].IsAdmin = true

        SaveUserTipos(TiposCopy)
        setTiposUsuarios(TiposCopy)

    }







    const handleChangePermit = (TipoIndex, PermitIndex) => {
        var TiposCopy = [...props.TiposUsuarios]
        TiposCopy[TipoIndex].Permits[PermitIndex] = !TiposCopy[TipoIndex].Permits[PermitIndex]

        TiposCopy = [...CheckUsuarioBlock(TiposCopy, TipoIndex, PermitIndex)]
        TiposCopy = [...CheckAtivosBlock(TiposCopy, TipoIndex, PermitIndex)]
        TiposCopy = [...CheckConfigBlock(TiposCopy, TipoIndex, PermitIndex)]
        TiposCopy = [...CheckAllCheched(TiposCopy, TipoIndex, PermitIndex)]


        EditUserType(TiposCopy[TipoIndex]).then(() => {
            SaveUserTipos(TiposCopy)
            setTiposUsuarios(TiposCopy)
            NotificationSucesso("Permissões","Permissões editadas com sucesso!")
        }).catch(() => {
            NotificationErro("Erro", "Ocorreu um problema, tente novamente")
        })

    }



    return (
        <div className={localStorage.getItem('AssetSenseTema') === 'Escuro' ? 'UserTypesPermitsContainerEscuro UserTypesPermitsContainer' : 'UserTypesPermitsContainerClaro UserTypesPermitsContainer'}>

            <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column"   >

                {TiposUsuarios.map((TipoUsuario, IndexTipoUsuario) => {
                    return <div key={v4()} className='UserTypesPermits-TypeContainer'>
                        <div className='UserTypesPermits-TypeContainer-Title'>
                            <span>{TipoUsuario.Value}</span>
                            {TipoUsuario.IsAdmin ?
                                <Tooltip title="Possui permissões de Administrador" position="bottom" >
                                    <ImCheckboxChecked />
                                </Tooltip>
                                :
                                <Tooltip title="Permissões de Administrador" position="bottom" >
                                    <ImCheckboxUnchecked onClick={e => CheckAdmin(IndexTipoUsuario)} />
                                </Tooltip>
                            }
                        </div>
                        <div className='UserTypesPermits-TypeContainer-List'>
                            {TipoUsuario.Permits.map((Permit, PermitIndex) => {
                                const IsBlockTitle = PermitIndex === PermitIndexs['CONFIGURACOES'] || PermitIndex === PermitIndexs['ATIVOS'] || PermitIndex === PermitIndexs['USUARIOS']
                                return <div key={v4()} onClick={e => handleChangePermit(IndexTipoUsuario, PermitIndex)} className={IsBlockTitle ? 'UserTypesPermits-TypeContainer-ListItemBlock' : 'UserTypesPermits-TypeContainer-ListItem'}>
                                    {Permit === true ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
                                    <span> {PermitDesc[PermitIndex]}</span>
                                </div>
                            })}
                        </div>
                    </div>
                })}

            </Masonry>

        </div>
    )
}


const ConnectedUserTypesPermits = connect((state) => {
    return {
        Setores: state.Setores,
        Usuarios: state.Usuarios,
        TiposUsuarios: state.TiposUsuarios
    }
})(UserTypesPermits)

export default ConnectedUserTypesPermits 