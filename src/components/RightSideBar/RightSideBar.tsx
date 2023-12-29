import React, { useEffect, useState } from 'react';
import Icons from '../UtilsComponents/Icons';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  ListItemIcon,
  Checkbox,
  Divider,
  Typography,
  Radio,
  Input,
  InputAdornment
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';

type Props = {
  text: string;
};

type Attribute = {
  name: string;
  values: string[];
  value: string;
}[];

const RightSideBar = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const data = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [groupOpen, setGroupOpen] = useState<Record<string, boolean>>({});
  const [checkboxState, setCheckboxState] = useState<Record<string, boolean | undefined>>({});
  const [configData, setConfigData] = useState<Record<string, Attribute>>();
  const [subCategory, setSubCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleRadioSubCategoryChange = (value: string) => () => {
    setSubCategory(value);
  };

  const handlePriceInputChange = (field: 'min' | 'max') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (field === 'min') {
      setMinPrice(value);
    } else {
      setMaxPrice(value);
    }
  };

  useEffect(() => {
    axios.get('http://127.0.0.1:4500/productsAttributes', {
      params: {
        text: props.text
      }
    })
      .then((response) => {
        const data = response.data;
        setConfigData(
          data.reduce((groups: any, item: any) => ({
            ...groups,
            [item.name]: [...(groups[item.name] || []), item]
          }), {})
        );
      })
      .catch((error) => console.log(error));
  }, [checkboxState]);

  const toggleDrawer = (isOpen: boolean) => () => {
    setOpen(isOpen);
  };

  const toggleGroup = (attributeName: string) => {
    setGroupOpen((prevOpen) => {
      return { ...prevOpen, [attributeName]: !prevOpen[attributeName] };
    });
  };

  const handleCheckboxChange = (attributeName: string, value: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxState((prevState) => ({
      ...prevState,
      [`${attributeName}-${value}`]: event.target.checked,
    }));
    console.log(checkboxState)
  };

  useEffect(() => {
    // Формируем новый объект параметров на основе checkboxState
    const newParams = Object.entries(checkboxState).reduce((params, [key, value]) => {
      if (value) {
        const [attributeName, attributeValue] = key.split('-');
        params.set(attributeName, attributeValue);
      }
      return params;
    }, new URLSearchParams());

    // Обновляем параметры адресной строки
    navigate(`?${newParams.toString()}`);
  }, [checkboxState]);

  return (
    <div style={{ position: 'relative' }}>
      <div onClick={toggleDrawer(true)} style={{ cursor: 'pointer' }}>
        <Icons.SvgFilter />
      </div>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)} sx={{ top: '100px' }} slotProps={{ backdrop: { invisible: true } }}>
        

        <List sx={{ width: '427px', height: '80%', top: '10%' }}>
        <ListItemButton>
          <Radio
            checked={subCategory === 'subCategory1'}
            onChange={handleRadioSubCategoryChange('subCategory1')}
          />
          <ListItemText primary={<Typography variant='sideBarName'>{"Laptops, notebooks"}</Typography>} />
        </ListItemButton>
        <ListItemButton>
          <Radio
            checked={subCategory === 'subCategory2'}
            onChange={handleRadioSubCategoryChange('subCategory2')}
          />
          <ListItemText primary="Subcategory 2" />
        </ListItemButton>

        {/* Поле ввода для диапазона цен */}
        <ListItemButton>
          <Input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={handlePriceInputChange('min')}
            endAdornment={<InputAdornment position="end">USD</InputAdornment>}
          />
        </ListItemButton>
        <ListItemButton>
          <Input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={handlePriceInputChange('max')}
            endAdornment={<InputAdornment position="end">USD</InputAdornment>}
          />
        </ListItemButton>
          {Object.keys(configData || {}).map((attributeName, index) => (
            <React.Fragment key={index}>
              <ListItemButton onClick={() => toggleGroup(attributeName)}>
                <ListItemIcon>
                  {groupOpen[attributeName] ? <ExpandLessIcon sx={{ width: 29, height: 29 }} /> : <ExpandMoreIcon sx={{ width: 29, height: 29 }} />}
                </ListItemIcon>
                <ListItemText primary={<Typography variant='sideBarName'>{attributeName}</Typography>} />
              </ListItemButton>
              <Collapse in={groupOpen[attributeName]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {configData && configData[attributeName].map((valueItem) => (
                    <ListItemButton key={valueItem.value}>
                      <Checkbox
                        checked={checkboxState[`${attributeName}-${valueItem.value}`]}
                        onChange={handleCheckboxChange(attributeName, valueItem.value)}
                      />
                      <ListItemText primary={
                        <Typography variant='sideBarName'>{valueItem.value}</Typography>}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
              <Divider sx={{ width: '90%', margin: '0 auto' }} />
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default RightSideBar;
