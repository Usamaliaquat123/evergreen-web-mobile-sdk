/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import ListSubheader from '@material-ui/core/ListSubheader';

import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';

import Collapse from '@material-ui/core/Collapse';

import InboxIcon from '@material-ui/icons/MoveToInbox';

import DraftsIcon from '@material-ui/icons/Drafts';

import SendIcon from '@material-ui/icons/Send';

import ListItemIcon from '@material-ui/core/ListItemIcon';

import ExpandLess from '@material-ui/icons/ExpandLess';

import ExpandMore from '@material-ui/icons/ExpandMore';

import StarBorder from '@material-ui/icons/StarBorder';

import { Link } from 'react-router-dom';

import './AdminStyles.css';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
}));

export default function Sidebar(props) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(true);

	const handleClickk = () => {
		setOpen(!open);
	};

	const { activeComponent } = props;
	const activeDisplay = {
		// backgroundColor: 'blueviolet',
	};

	return (
		<List
			component='nav'
			aria-labelledby='nested-list-subheader'
			subheader={(
    <ListSubheader component='div' id='nested-list-subheader'>
					Dashboard
				</ListSubheader>
  )}
			className={classes.root}
		>
			{/* start li  */}
			<ListItem
				button
				onClick={(e) => props.handleClick('Dashboard')}
				id='Dashboard'
				style={activeComponent === 'Dashboard' ? activeDisplay : null}
			>
				<ListItemIcon>
					<SendIcon />
				</ListItemIcon>
				<ListItemText primary='Dashboard'></ListItemText>
			</ListItem>
			{/* end li */}
			{/* start li  */}
			<ListItem
				button
				onClick={(e) => props.handleClick('UserPage')}
				id='UserPage'
				style={activeComponent === 'UserPage' ? activeDisplay : null}
			>
				<ListItemIcon>
					<SendIcon />
				</ListItemIcon>
				<ListItemText primary='AdminPage'></ListItemText>
			</ListItem>
			{/* end li */}
			{/* start li  */}
			<ListItem
				button
				onClick={(e) => props.handleClick('AdminPage')}
				id='AdminPage'
				style={activeComponent === 'AdminPage' ? activeDisplay : null}
			>
				<ListItemIcon>
					<SendIcon />
				</ListItemIcon>

				<ListItemText primary='AdminPage'></ListItemText>
			</ListItem>
			{/* end li */}
			{/* start li  */}
			<ListItem
				button
				onClick={(e) => props.handleClick('ProductPage')}
				id='ProductPage'
				style={activeComponent === 'ProductPage' ? activeDisplay : null}
			>
				<ListItemIcon>
					<SendIcon />
				</ListItemIcon>
				<ListItemText primary='ProductPage'></ListItemText>
			</ListItem>
			{/* end li */}
			{/* start li  */}
			<ListItem
				button
				onClick={(e) => props.handleClick('All-Categories')}
				id='All-Categories'
				style={activeComponent === 'All-Categories' ? activeDisplay : null}
			>
				<ListItemIcon>
					<SendIcon />
				</ListItemIcon>
				<ListItemText primary='All Categories'></ListItemText>
			</ListItem>
			
			<ListItem
				button
				onClick={(e) => props.handleClick('Add-Category')}
				id='Add-Category'
				style={activeComponent === 'Add-Category' ? activeDisplay : null}
			>
				<ListItemIcon>
					<SendIcon />
				</ListItemIcon>
				<ListItemText primary='Add Category'></ListItemText>
			</ListItem>
			{/* end li */}
			<ListItem button style={activeComponent === 'ProductPage' ? activeDisplay : null}>
				<ListItemIcon>
					<DraftsIcon />
				</ListItemIcon>
				<Link className='font-bold text-black text-decoration-none ' to='/admin/all-users'>
					<ListItemText primary='All Users'></ListItemText>
				</Link>
			</ListItem>
			<ListItem button onClick={handleClickk}>
				<ListItemIcon>
					<InboxIcon />
				</ListItemIcon>
				<ListItemText primary='Results' />
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={open} timeout='auto' unmountOnExit>
				<List component='div' disablePadding>
					<ListItem button className={classes.nested}>
						<ListItemIcon>
							<StarBorder />
						</ListItemIcon>
						<Link className='font-bold text-black text-decoration-none ' to='/admin/all-questions'>
							<ListItemText primary='All Results'></ListItemText>
						</Link>
					</ListItem>
				</List>
			</Collapse>
		</List>
	);
}
