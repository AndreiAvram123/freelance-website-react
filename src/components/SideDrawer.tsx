import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import {SupervisorAccount} from "@material-ui/icons";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex'
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerContainer: {
            overflow: 'auto'
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }),
);

export default function SideDrawer() {
    const classes = useStyles();

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <Toolbar />
            <div className={classes.drawerContainer}>
                <List>
                    <ListItem button key={"Home"} onClick={()=>window.location.href = "/"}>
                        <ListItemIcon> <HomeIcon /> </ListItemIcon>
                        <ListItemText primary={"Home"} />
                    </ListItem>
                    <ListItem button key={"Admin"} onClick={()=>window.location.href = "/admin"}>
                        <ListItemIcon><SupervisorAccount/></ListItemIcon>
                        <ListItemText primary={"Admin"}/>
                    </ListItem>
                </List>
            </div>
        </Drawer>
        )
}
