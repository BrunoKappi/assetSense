import { PermitIndexs as Index } from "../../GlobalVars"




export const CheckPermits = (Types, TypeIndex, PermitIndex) => {

    const ListCopy = [...Types[TypeIndex].Permits]

    if ((ListCopy[Index['RETIRAR_ASSETS']] ||
        ListCopy[Index['ADD_ASSETS']] ||
        ListCopy[Index['EDIT_ASSETS']] ||
        ListCopy[Index['DELETE_ASSETS']]) && PermitIndex !== Index['VIEW_ASSETS']
    ) {
        ListCopy[Index['VIEW_ASSETS']] = true
    } else if (!ListCopy[Index['VIEW_ASSETS']]) {
        ListCopy[Index['RETIRAR_ASSETS']] = false
        ListCopy[Index['ADD_ASSETS']] = false
        ListCopy[Index['EDIT_ASSETS']] = false
        ListCopy[Index['DELETE_ASSETS']] = false
    }


    if ((ListCopy[Index['RETIRAR_USERS']] ||
        ListCopy[Index['ADD_USERS']] ||
        ListCopy[Index['EDIT_USERS']] ||
        ListCopy[Index['DELETE_USERS']]) && PermitIndex !== Index['VIEW_USERS']
    ) {
        ListCopy[Index['VIEW_USERS']] = true
    } else if (!ListCopy[Index['VIEW_USERS']]) {
        ListCopy[Index['RETIRAR_USERS']] = false
        ListCopy[Index['ADD_USERS']] = false
        ListCopy[Index['EDIT_USERS']] = false
        ListCopy[Index['DELETE_USERS']] = false
    }

    if (ListCopy[Index['EDIT_PERMICOES']] && PermitIndex !== Index['EDIT_TYPES_DE_USER']) {
        ListCopy[Index['EDIT_TYPES_DE_USER']] = true
    }



    Types[TypeIndex].Permits = [...ListCopy]


    return Types
}


export const CheckIfOneCanEditPermits = (TypesCopy) => {

    var OneEditPermits = false

    TypesCopy.map(Type => {
        if (Type.Permits[Index['EDIT_PERMICOES']])
            OneEditPermits = true
    })

    return OneEditPermits


}