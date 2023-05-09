import React, { useState } from 'react'
import { useEffect } from 'react';
import { connect } from "react-redux";


const ItemName = (props) => {

    const [ItemList, setItemList] = useState([])
    const [ItemValue, setItemValue] = useState([])

    useEffect(() => {
        const List = props[props.Collection.replace(/WithDeleted/g, "")]
        const Item = List?.find(item => item?.id === props?.ID)

        switch (props.Collection) {
            case 'Users':
                setItemValue(Item?.Name + ' ' + Item?.LastName)
                break;
            case 'UsersWithDeleted':
                setItemValue(Item?.Name + ' ' + Item?.LastName)
                break;
            default:
                setItemValue(Item?.Value || '')
                break;
        }

    }, [props.Collection])

    return ItemValue
}



const ConnectedItemName = connect((state) => {
    return {
        Tema: state.Tema,
        Assets: state.Assets,
        Users: state.Users,
        UserTypes: state.UserTypes,
        AssetTypes: state.AssetTypes,
        AssetsStatus: state.AssetsStatus,
        UsageTypes: state.UsageTypes,
        StorageLocations: state.StorageLocations,
        Sectors: state.Sectors,
        RequestsTypes: state.RequestsTypes,
        RequestsStatus: state.RequestsStatus,
    }
})(ItemName)

export default ConnectedItemName 