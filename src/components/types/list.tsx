import React, {useContext} from 'react'
import { AppPluginMeta, KeyValue } from "@grafana/data"
import { MainList } from 'components/auxiliary/dittoThing/list/main'
import { deleteTypeService } from 'services/types/crud/deleteTypeService'
import { StaticContext } from 'utils/context/staticContext'
import { getAllTypesService } from 'services/types/getAllTypesService'

interface Parameters {
    path: string
    meta: AppPluginMeta<KeyValue<any>>
}

export function ListTypes({ path, meta }: Parameters) {

    const context = useContext(StaticContext)

    return <MainList 
            path={path} 
            meta={meta} 
            isType={true} 
            funcThings={() => getAllTypesService(context)} 
            funcDelete={deleteTypeService}
        />

}
