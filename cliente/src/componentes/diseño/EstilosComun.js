import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

export function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
export const EstilosComun= makeStyles((theme) => ({
    card: {
        direction:"column",
        alignItems:"center",
        justify:"center",
        borderRadius: 10,
        boxShadow: ' 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        marginLeft: "2rem",
        marginRight: "2rem",
        },
        cardInicio: {
            direction:"column",
            alignItems:"center",
            justify:"center",
            borderRadius: 10,
            boxShadow: ' 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
            marginLeft: "2rem",
            marginRight: "2rem",
            marginTop:"1rem"
            },
    root: {
        flexGrow: 1,
        },
    menuButton: {
        marginRight: theme.spacing(2),
        },
    title: {
        flexGrow: 1,
        },
    contenidoFormulario: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
        },
    formulario: {
        width: '60%',
        },
    boton: {
        margin: theme.spacing(3, 0, 2),
        borderRadius: 50,
        },
  }));