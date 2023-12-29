// AdminProductListPage.tsx
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Modal,
  TextField,
  IconButton,
  Select,
  MenuItem,
} from '@mui/material';
import EditAttributesModal from '../components/EditAttributesModal';
import { useCookies } from 'react-cookie';
import instance from '../config/axios';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  sale: number;
  predictedprice?: number;
  category_id: number;
  subcategory_id: number;
}

interface Category {
  id: number;
  name: string;
}

interface Subcategory {
  id: number;
  name: string;
}

const AdminProductListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditAttributesModalOpen, setIsEditAttributesModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<number | null>(null);
  const [token] = useCookies(['bestproducts']);
  const [editableFields, setEditableFields] = useState<{ [key: number]: boolean }>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: productData } = await instance.get<Product[]>('/adminproducts', {
          headers: {
            Authorization: token.bestproducts,
          },
        });
        setProducts(productData);

        const { data: categoryData } = await instance.get<Category[]>('/categories');
        setCategories(categoryData);

        const { data: subcategoryData } = await instance.get<Subcategory[]>('/subcategories');
        setSubcategories(subcategoryData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token]);

  const handleEditAttributesClick = (productId: number) => {
    setSelectedProductId(productId);
    setIsEditAttributesModalOpen(true);
  };

  const handleToggleEdit = (productId: number) => {
    setEditableFields((prevFields) => ({
      ...prevFields,
      [productId]: !prevFields[productId],
    }));
  };

  const handleSaveEdit = async (productId: number) => {
    try {
      const updatedProduct = products.find((product) => product.id === productId);
      if (!updatedProduct) {
        console.error(`Product with ID ${productId} not found`);
        return;
      }

      await instance.put(`/adminproducts/${productId}`, updatedProduct);

      handleToggleEdit(productId); // Switch back to non-edit mode
    } catch (error) {
      console.error(`Error updating product with ID ${productId}:`, error);
    }
  };

  const updateProductField = (prevProducts: Product[], productId: number, field: string, value: string) => {
    return prevProducts.map((product) =>
      product.id === productId ? { ...product, [field]: value } : product
    );
  };

  const calculatePredictedPrice = (productId: number) => {
    const productToUpdate = products.find((product) => product.id === productId);

    if (productToUpdate) {
      const currentPrice = productToUpdate.price;
      const salePercentage = productToUpdate.sale;
      const discountAmount = (currentPrice * salePercentage) / 100;
      const predictedPrice = currentPrice - discountAmount;

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? { ...product, predictedprice: predictedPrice } : product
        )
      );
    }
  };

  const handleDelete = async (productId: number) => {
    try {
      await instance.delete(`/adminproducts/${productId}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
    } catch (error) {
      console.error(`Error deleting product with ID ${productId}:`, error);
    }
  };

  const handleAddProduct = async () => {
    try {
      if (!selectedCategoryId || !selectedSubcategoryId) {
        console.error('Please select both category and subcategory.');
        return;
      }

      const newProduct: Product = {
        id: products.length + 1,
        name: 'New Product',
        description: 'Description',
        price: 0,
        sale: 0,
        category_id: selectedCategoryId,
        subcategory_id: selectedSubcategoryId,
      };

      const { data } = await instance.post<Product>('/adminproducts', newProduct);
      setProducts((prevProducts) => [...prevProducts, data]);
    } catch (error) {
      console.error('Error adding a new product:', error);
    }
  };

  const handleCategoryChange = (productId: number, categoryId: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, category_id: categoryId } : product
      )
    );
  };

  const handleSubcategoryChange = (productId: number, subcategoryId: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, subcategory_id: subcategoryId } : product
      )
    );
  };

  return (
    <div>
      <h2>Products List</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Subcategory</TableCell>
              <TableCell>Predicted Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>
                  {editableFields[product.id] ? (
                    <TextField
                      value={product.name}
                      onChange={(e) => setProducts((prev) => updateProductField(prev, product.id, 'name', e.target.value))}
                    />
                  ) : (
                    product.name
                  )}
                </TableCell>
                <TableCell>
                  {editableFields[product.id] ? (
                    <TextField
                      value={product.description}
                      onChange={(e) =>
                        setProducts((prev) => updateProductField(prev, product.id, 'description', e.target.value))
                      }
                    />
                  ) : (
                    product.description
                  )}
                </TableCell>
                <TableCell>
                  {editableFields[product.id] ? (
                    <TextField
                      value={product.price}
                      onChange={(e) => {
                        const newPrice = parseFloat(e.target.value);
                        setProducts((prev) => updateProductField(prev, product.id, 'price', isNaN(newPrice) ? '' : newPrice.toString()));
                        calculatePredictedPrice(product.id);
                      }}
                    />
                  ) : (
                    product.price
                  )}
                </TableCell>
                <TableCell>
                  {editableFields[product.id] ? (
                    <TextField
                      value={product.sale}
                      onChange={(e) => {
                        const newSale = parseFloat(e.target.value);
                        setProducts((prev) => updateProductField(prev, product.id, 'sale', isNaN(newSale) ? '' : newSale.toString()));
                        calculatePredictedPrice(product.id);
                      }}
                    />
                  ) : (
                    product.sale
                  )}
                </TableCell>
                <TableCell>
                  {editableFields[product.id] ? (
                    <Select
                      value={product.category_id}
                      onChange={(e) => handleCategoryChange(product.id, e.target.value as number)}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    product.category_id
                  )}
                </TableCell>
                <TableCell>
                  {editableFields[product.id] ? (
                    <Select
                      value={product.subcategory_id}
                      onChange={(e) => handleSubcategoryChange(product.id, e.target.value as number)}
                    >
                      {subcategories.map((subcategory) => (
                        <MenuItem key={subcategory.id} value={subcategory.id}>
                          {subcategory.name}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    product.subcategory_id
                  )}
                </TableCell>
                <TableCell>{product.predictedprice || (product.price || 0) - (product.price || 0) * (product.sale / 100)}</TableCell>
                <TableCell>
                  {editableFields[product.id] ? (
                    <IconButton onClick={() => handleSaveEdit(product.id)} size="small">
                      <SaveIcon />
                    </IconButton>
                  ) : (
                    <>
                      <IconButton onClick={() => handleToggleEdit(product.id)} size="small">
                        <EditIcon />
                      </IconButton>
                      <Button
                        variant="outlined"
                        onClick={() => handleEditAttributesClick(product.id)}
                      >
                        Edit Attributes
                      </Button>
                      <IconButton onClick={() => handleDelete(product.id)} size="small">
                        Delete
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {isEditAttributesModalOpen && (
        <Modal
          open={isEditAttributesModalOpen}
          onClose={() => setIsEditAttributesModalOpen(false)}
          closeAfterTransition
        >
          <EditAttributesModal
            productId={selectedProductId}
            isOpen={isEditAttributesModalOpen}
            onClose={() => setIsEditAttributesModalOpen(false)}
            onUpdate={() => {
              // Add logic to update the product list after attributes are edited
            }}
          />
        </Modal>
      )}

      <Button variant="outlined" onClick={handleAddProduct}>
        Add Product
      </Button>
    </div>
  );
};

export default AdminProductListPage;
