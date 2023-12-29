// EditAttributesModal.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Modal,
  Backdrop,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from '@mui/material';
import instance from '../config/axios';

interface Attribute {
  id: number;
  name: string;
  value: string;
}

interface ProductAttribute {
  attributeId: number;
  attributeName: string;
  value: string;
}

interface EditAttributesModalProps {
  productId: number | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

const EditAttributesModal: React.FC<EditAttributesModalProps> = ({ productId, isOpen, onClose, onUpdate }) => {
  const [allAttributes, setAllAttributes] = useState<Attribute[]>([]);
  const [productAttributes, setProductAttributes] = useState<ProductAttribute[]>([]);
  const [selectedAttributes, setSelectedAttributes] = useState<number[]>([]);
  const [newAttributes, setNewAttributes] = useState<Attribute[]>([]);
  const [newAttributeName, setNewAttributeName] = useState<string>('');
  const [newAttributeValue, setNewAttributeValue] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await instance.get<{ attributes: Attribute[]; productAttributes: ProductAttribute[] }>(
          `/productsattributes/${productId}/`
        );

        const formattedAttributes = data.attributes.map(attr => ({
          ...attr,
          value: data.productAttributes.find(pAttr => pAttr.attributeId === attr.id)?.value || '',
        }));

        setAllAttributes(data.attributes);
        setProductAttributes(data.productAttributes);
        setSelectedAttributes(data.productAttributes.map(attr => attr.attributeId));
      } catch (error) {
        console.error(error);
      }
    };

    if (isOpen && productId) {
      fetchData();
    }
  }, [productId, isOpen]);

  const handleAttributeChange = (attributeId: number) => {
    setSelectedAttributes(prevAttributes =>
      prevAttributes.includes(attributeId)
        ? prevAttributes.filter(id => id !== attributeId)
        : [...prevAttributes, attributeId]
    );
  };

  const handleSave = async () => {
    try {
      await instance.put(`/productsattributes/${productId}`, selectedAttributes);
      console.log('Attributes updated successfully!');
      onUpdate();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewAttributeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewAttributeName(event.target.value);
  };

  const handleNewAttributeValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewAttributeValue(event.target.value);
  };

  const handleAddNewAttribute = async () => {
    try {
      const { data } = await instance.post('/attributes', { name: newAttributeName, value: newAttributeValue });
      setNewAttributes(prevAttributes => [...prevAttributes, data]);
      setNewAttributeName('');
      setAllAttributes(prevAttributes => [...prevAttributes, data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
    >
      <div style={{ width: '70%', margin: 'auto', marginTop: '50px', backgroundColor: 'white', padding: '20px', maxHeight: '80vh', overflowY: 'auto' }}>
        <h2>Edit Attributes</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...allAttributes, ...newAttributes].map(attribute => (
                <TableRow key={attribute.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedAttributes.includes(attribute.id)}
                      onChange={() => handleAttributeChange(attribute.id)}
                    />
                  </TableCell>
                  <TableCell>{attribute.name}</TableCell>
                  <TableCell>{attribute.value}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>
                  <Checkbox checked={false} disabled />
                </TableCell>
                <TableCell>
                  <TextField
                    label="New Attribute"
                    value={newAttributeName}
                    onChange={handleNewAttributeChange}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    label="Value"
                    value={newAttributeValue}
                    onChange={handleNewAttributeValueChange}
                  />
                </TableCell>
                <TableCell>
                  <Button variant="contained" onClick={handleAddNewAttribute}>
                    Add
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" onClick={handleSave} style={{ marginTop: '20px' }}>
          Save Changes
        </Button>

        <h3>Current Attributes</h3>
        <ul>
          {productAttributes.map(attr => (
            <li key={attr.attributeId}>{attr.attributeName}</li>
          ))}
        </ul>
      </div>
    </Modal>
  );
};

export default EditAttributesModal;
