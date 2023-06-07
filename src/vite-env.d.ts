/// <reference types="vite/client" />
import { defineSealedProperties as defineSealedPropertiesFn } from './shared/utils'
import { Types as TypesType } from './shared/types'
import configType from './config'

declare global {
    const defineSealedProperties: typeof defineSealedPropertiesFn

    const Types: typeof TypesType

    const config: typeof configType

    interface Window extends UtilsType {
        config: typeof configType
    }
}
