import React, { useState, useEffect } from "react";
import { validateUser } from "../../scripts/Auth";
import { Link, useHistory } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { createProduct } from "../../scripts/admin";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 850,
    },
  },
};

function CreateProductForm() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedFile, setSelectedFile] = useState([]);
  const [category, setCategory] = useState([]);
  const [gender, setGender] = useState();
  const [technicalFeature, setTechnicalFeature] = useState([]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [xs, setXs] = useState(false);
  const [s, setS] = useState(false);
  const [m, setM] = useState(false);
  const [l, setL] = useState(false);
  const [xl, setXl] = useState(false);
  const [xxl, setXxl] = useState(false);
  const [isKids, setIsKids] = useState(false);
  const theme = useTheme();
  const history = useHistory();

  const categories = ["fashion", "jacket", "denim", "summer wears"];
  const technicalFeatures = [
    "Premium Fabric",
    "Regular Fit",
    "Water Resistant",
    "Wind Resistant",
  ];

  useEffect(() => {
    const checkUserAuthenticity = async () => {
      await validateUser().then((data) => {
        setIsAdmin(data.data.isAdmin);
      });
    };

    checkUserAuthenticity();
  }, []);

  function getStyles(name, category, theme) {
    return {
      fontWeight:
        category.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const changeHandler = (event) => {
    setSelectedFile(event.target.files);
  };

  const handleChange = (event) => {
    event.preventDefault()
    const {
      target: { value },
    } = event;
    setCategory(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeFeatures = (event) => {
    event.preventDefault()
    const {
      target: { value },
    } = event;
    setTechnicalFeature(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    Object.values(selectedFile).map((file) => {
      formData.append('product-images',file)
    })
    formData.append("product-images", selectedFile);
    formData.append("productName", productName);
    formData.append("description", productDescription);
    formData.append("price", productPrice);
    formData.append('technicalFeatures',JSON.stringify(technicalFeature));
    formData.append('category',JSON.stringify(category))
    let sizes = [];
    sizes[0] = xs ? 1 : 0;
    sizes[1] = s ? 1 : 0;
    sizes[2] = m ? 1 : 0;
    sizes[3] = l ? 1 : 0;
    sizes[4] = xl ? 1 : 0;
    sizes[5] = xxl ? 1 : 0;
    formData.append("sizes", JSON.stringify(sizes));
    formData.append("gender", gender);
    formData.append("kids", isKids);
    await createProduct(formData).then((data) => {
      history.pushState('/admin')
    })
  };

  if (isAdmin) {
    return (
      <div className="my-16 w-full">
        <form
          className="w-3/4 mx-auto px-12 py-12"
        >
          <div className="flex my-4">
            <label className="MaisonNeueMonoRegular w-1/4 font-bold tracking-widest mr-12">
              Images :
            </label>
            <input
              className="w-3/4"
              type="file"
              name="file"
              onChange={changeHandler}
              multiple
            />
          </div>
          {/* input field for the product name */}
          <div className="flex justify-between  my-4">
            <label className="MaisonNeueMonoRegular  w-1/4 font-bold tracking-widest mr-12">
              Product Name:
            </label>
            <input
              type="text"
              value={productName}
              className="w-3/4 font-thin h-10 px-8 text-sm mx-12 border-2 border-black"
              onChange={(e) => {
                setProductName(e.target.value);
              }}
            />
          </div>
          {/* Text area for the product description */}
          <div className="flex justify-between  my-4">
            <label className="MaisonNeueMonoRegular w-1/4 font-bold tracking-widest mr-12">
              Product Description :
            </label>
            <textarea
              type="text"
              rows="4"
              className="w-3/4 font-thin px-8 text-sm mx-12 border-2 border-black"
              value={productDescription}
              onChange={(e) => {
                setProductDescription(e.target.value);
              }}
            />
          </div>
          {/* input field for the price of the product */}
          <div className="flex my-4">
            <label className="MaisonNeueMonoRegular w-1/4 font-bold tracking-widest mr-12">
              Product Price:
            </label>
            <input
              type="number"
              value={productPrice}
              className="w-3/4 font-thin h-10 px-8 text-sm mx-12 border-2 border-black"
              onChange={(e) => {
                setProductPrice(e.target.value);
              }}
            />
          </div>
          {/* multiple field selection for the product category */}
          <div className="flex my-4">
            <label className="MaisonNeueMonoRegular w-1/4 font-bold tracking-widest mr-12">
              Product Category :
            </label>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              className="w-3/4 mx-10 border-2 border-black"
              value={category}
              onChange={handleChange}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
            >
              {categories.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, category, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </div>
          {/* Technical features multiple tag list selection menu for it */}
          <div className="flex my-4">
            <label className="MaisonNeueMonoRegular w-1/4 font-bold tracking-widest mr-12">
              Features :
            </label>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              className="w-3/4 mx-10 border-2 border-black"
              value={technicalFeature}
              onChange={handleChangeFeatures}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
            >
              {technicalFeatures.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, technicalFeature, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </div>
          {/* sizes multiple select option  */}
          <div className="flex my-4">
            <label className="MaisonNeueMonoRegular w-1/4 font-bold tracking-widest mr-12">
              Select Sizes :
            </label>
            <div className="flex my-3">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setXs(!xs);
                }}
                className={
                  xs
                    ? "mx-2 rounded-full px-3 cursor-pointer bg-black text-white h-8 py-2 text-xs align-middle black-border"
                    : "mx-2 rounded-full px-3 cursor-pointer h-8 py-2 text-xs align-middle black-border"
                }
              >
                XS
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setS(!s);
                }}
                className={
                  s
                    ? "mx-2 rounded-full px-3 cursor-pointer bg-black text-white h-8 py-2 text-xs align-middle black-border"
                    : "mx-2 rounded-full px-3 cursor-pointer h-8 py-2 text-xs align-middle black-border"
                }
              >
                S
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setM(!m);
                }}
                className={
                  m
                    ? "mx-2 rounded-full px-3 cursor-pointer bg-black text-white h-8 py-2 text-xs align-middle black-border"
                    : "mx-2 rounded-full px-3 cursor-pointer h-8 py-2 text-xs align-middle black-border"
                }
              >
                M
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setL(!l);
                }}
                className={
                  l
                    ? "mx-2 rounded-full px-3 cursor-pointer bg-black text-white h-8 py-2 text-xs align-middle black-border"
                    : "mx-2 rounded-full px-3 cursor-pointer h-8 py-2 text-xs align-middle black-border"
                }
              >
                L
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setXl(!xl);
                }}
                className={
                  xl
                    ? "mx-2 rounded-full px-3 cursor-pointer bg-black text-white h-8 py-2 text-xs align-middle black-border"
                    : "mx-2 rounded-full px-3 cursor-pointer h-8 py-2 text-xs align-middle black-border"
                }
              >
                XL
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setXxl(!xxl);
                }}
                className={
                  xxl
                    ? "mx-2 rounded-full px-3 cursor-pointer bg-black text-white h-8 py-2 text-xs align-middle black-border"
                    : "mx-2 rounded-full px-3 cursor-pointer h-8 py-2 text-xs align-middle black-border"
                }
              >
                XXL
              </button>
            </div>
          </div>
          {/* gender selection drop down menu */}
          <div className="flex my-4">
            <label className="MaisonNeueMonoRegular w-1/4 font-bold tracking-widest mr-12">
              Gender :
            </label>
            <Select
              labelId="demo-simple-select-label"
              className="w-3/4 mx-10 border-2 border-black"
              value={gender}
              onChange={(e) => {
                e.preventDefault()
                setGender(e.target.value);
              }}
            >
              <MenuItem value={"M"}>Male</MenuItem>
              <MenuItem value={"F"}>Female</MenuItem>
            </Select>
          </div>
          {/* isKid selection menu */}
          <div className="flex my-4 ml-0">
            <input
              type="checkbox"
              value={isKids}
              className="font-thin h-10 text-sm border-2 border-black"
              onChange={(e) => {
                setIsKids(!isKids);
              }}
            />
            <label className="MaisonNeueMonoRegular font-bold tracking-widest mx-3 mt-2">
              For Kids
            </label>
          </div>
          <div className="w-full mt-16">
            <button
              onClick={handleCreateProduct}
              className="w-3/4 bg-black rounded-full h-12 text-white tracking-wideest text-md font-thin form-button mt-2 mx-36"
            >CREATE PRODUCT</button>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className="text-center w-full my-60 py-8 ">
        <h3 className="MaisonNeueMonoRegular py-4 text-2xl tracking-wider">
          Not Authorized user
        </h3>
        <Link className="MaisonNeueMonoRegular text-md tracking-wider" to="/">
          GO BACK TO HOME.....
        </Link>
      </div>
    );
  }
}

export default CreateProductForm;
