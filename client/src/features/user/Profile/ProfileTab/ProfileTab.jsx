import React from 'react';
import PropTypes from 'prop-types';

//MUI stuff
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

//Local stuff
import AboutUser from './AboutUser';
import Following from './Following';
import Followers from './Followers';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginTop: 20,
    // marginLeft: 20,
  },
}));

export default function ProfileTab({ profile, isCurrentUser }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
        indicatorColor="primary"
        scrollButtons="on"
        style={{
          borderBottom: '1px solid #e6ecf0',
          marginRight: 15,
          marginLeft: 15,
        }}
      >
        <Tab
          style={{ textTransform: 'capitalize' }}
          label="About"
          {...a11yProps(0)}
        />

        <Tab
          style={{ textTransform: 'capitalize' }}
          label="Following"
          {...a11yProps(1)}
        />
        <Tab
          style={{ textTransform: 'capitalize' }}
          label="Followers"
          {...a11yProps(2)}
        />
      </Tabs>

      <TabPanel value={value} index={0}>
        <AboutUser profile={profile} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Following profile={profile} isCurrentUser={isCurrentUser} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Followers profile={profile} isCurrentUser={isCurrentUser} />
      </TabPanel>
    </div>
  );
}
