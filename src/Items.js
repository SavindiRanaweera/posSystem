import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./utils/Authcontext";

function Items() {
  const { isAuthenticated, jwtToken } = useAuth();

  const [items, setItems] = useState(null);
  const [categories, setCategories] = useState(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [itemId, setItemId] = useState(null);
  const [edit, setEdit] = useState(false);

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get("http://localhost:8081/items", config)
        .then(function (response) {
          setItems(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

      axios
        .get("http://localhost:8081/categories", config)
        .then(function (response) {
          setCategories(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [isAuthenticated]);

  function handleName(event) {
    setName(event.target.value);
  }

  function handlePrice(event) {
    setPrice(parseFloat(event.target.value));
  }

  function handleCategory(event) {
    setCategoryId(event.target.value);
  }

  const resetForm = () => {
    setName("");
    setPrice("");
    setCategoryId("");
    setItemId(null);
    setEdit(false);
  };

  function createItem(event) {
    event.preventDefault();

    const data = {
      name: name,
      price: price,
      categoryId: categoryId,
    };

    axios
      .post("http://localhost:8081/items", data, config)
      .then(function (response) {
        console.log(response);
        getItems();
        resetForm();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getItems() {
    axios
      .get("http://localhost:8081/items", config)
      .then(function (response) {
        setItems(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function updateItem(event) {
    event.preventDefault();

    const data = {
      name: name,
      price: price,
      categoryId: categoryId,
    };

    axios
      .put("http://localhost:8081/items/" + itemId, data, config)
      .then(function (response) {
        getItems();
        resetForm();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div class="container">
      <h1>Items</h1>

      <div className="row">
        <div className="col-lg-8">
          <div className="items">
            {items &&
              items.map((item) => {
                return (
                  <div key={item.id}>
                    <h2>{item.name}</h2>
                    <p>Category: {item.itemCategory.name}</p>
                    <p>Price: {item.price}</p>

                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        setEdit(true);
                        setItemId(item.id);
                        setName(item.name);
                        setPrice(item.price);
                        setCategoryId(item.itemCategory.id);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="col-lg-4">
          {!edit && (
            <form onSubmit={createItem}>
              <div>
                <label>Name : </label>
                <input type="text" onChange={handleName} required />
              </div>

              <br />

              <div>
                <label>Price : </label>
                <input type="text" onChange={handlePrice} required />
              </div>

              <br />

              <div>
                <label>Category : </label>
                <select onChange={handleCategory} required>
                  <option value="">Select a category</option>

                  {categories &&
                    categories.map((itemCategory) => (
                      <option key={itemCategory.id} value={itemCategory.id}>
                        {itemCategory.name}
                      </option>
                    ))}
                </select>
              </div>

              <br />

              <button type="submit" class="btn btn-primary">
                Create Item
              </button>
            </form>
          )}

          {edit && (
            <form onSubmit={updateItem}>
              <div>
                <label>Name : </label>
                <input
                  type="text"
                  onChange={handleName}
                  value={name}
                  required
                />
              </div>

              <br />

              <div>
                <label>Price : </label>
                <input
                  type="text"
                  onChange={handlePrice}
                  value={price}
                  required
                />
              </div>

              <br />

              <div>
                <label>Category : </label>
                <select onChange={handleCategory} required>
                  <option value="">Select a category</option>

                  {categories &&
                    categories.map((itemCategory) => (
                      <option
                        key={itemCategory.id}
                        value={itemCategory.id}
                        selected={itemCategory.id === categoryId}
                      >
                        {itemCategory.name}
                      </option>
                    ))}
                </select>
              </div>

              <br />

              <button type="submit" class="btn btn-primary ">
                Update Item
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Items;
