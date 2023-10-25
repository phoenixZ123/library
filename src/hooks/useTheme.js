import React from 'react'
import { useContext } from 'react'
import { ThemeContext } from '../Contexts/ThemeContext'

export const useTheme = () => {
  
    let context=useContext(ThemeContext)

    if(context==undefined){
        new Error("theme context should be only used in theme Context provider")
    }
    return context; //{theme : 'dark'}
}
