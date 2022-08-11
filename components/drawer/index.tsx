import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import * as React from 'react';
import DrawerList from './drawer.list';

export default function LeftSideDrawer(props: any) {
    const { toggleDrawer, state, children } = props;

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role='presentation'
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <DrawerList toggleDrawer={toggleDrawer} />
        </Box>
    );

    return (
        <div>
            <React.Fragment key='left-drawer'>
                <Drawer
                    anchor='left'
                    open={state}
                    onClose={toggleDrawer(false)}
                    variant='persistent'
                    sx={{ display: { sm: 'none', md: 'block', lg: 'block' } }}
                >
                    {list()}
                </Drawer>
                <Drawer
                    sx={{ display: { sm: 'block', md: 'none', lg: 'none' } }}
                    anchor='left'
                    open={state}
                    onClose={toggleDrawer(false)}
                    variant='temporary'
                >
                    {list()}
                </Drawer>
                {children}
            </React.Fragment>
        </div>
    );
}
