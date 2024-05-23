import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./utils/Authcontext";

function Stocks() {
  const { isAuthenticated, jwtToken } = useAuth();

  const [stocks, setStocks] = useState(null);
  const [items, setItems] = useState(null);

  const [quantity, setQuantity] = useState("");
  const [stockId, setStockId] = useState(null);
  const [itemId, setItemId] = useState(null);
  const [edit, setEdit] = useState(false);

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`
    }
  }

  function getItems() {
    axios
      .get("http://localhost:8081/items",config)
      .then(function (response) {
        setItems(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getStock() {
    axios
      .get("http://localhost:8081/stocks",config)
      .then(function (response) {
        setStocks(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    if(isAuthenticated){
      getStock();
    getItems();
    }
    
  }, [isAuthenticated]);

  function handleItemName(event) {
    setItemId(event.target.value);
  }

  function handleQuantity(event) {
    setQuantity(parseInt(event.target.value));
  }

  const resetForm = () => {
    setItemId(null);
    setQuantity("");
    setEdit(false);
  };

  function addStock(event) {
    event.preventDefault();

    const data = {
      quantity: quantity,
      itemId: itemId,
    };

    axios
      .post("http://localhost:8081/stocks", data,config)
      .then(function (response) {
        console.log(response);
        getStock();
        resetForm();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function updateStock(event) {
    event.preventDefault();

    const data = {
      quantity: quantity,
      itemId: itemId,
    };

    axios
      .put("http://localhost:8081/stocks/" + stockId, data,config)
      .then(function (response) {
        console.log("Stock updated successfully:", response);
        getStock();
        resetForm();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <h1>Stocks Control</h1>

      <div className="container table-responsive">
        <table className="table table-hover table-secondary table-bordered ">
          <thead className="table-light">
            <tr>
              <th>#ID</th>
              <th>Item</th>

              <th>Stock Qty</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {stocks &&
              stocks.map((stock) => (
                <tr key={stock.id}>
                  <td>{stock.id}</td>
                  <td>{stock.item?.name}</td>

                  <td>{stock.quantity}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      type="button"
                      onClick={() => {
                        setEdit(true);
                        setStockId(stock.id);
                        setItemId(stock.item?.id);

                        setQuantity(stock.quantity);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="container-md">
        {!edit && (
          <form onSubmit={addStock}>
            <div>
              <label>Item Name</label>
              <select onChange={handleItemName} required>
                <option value="">Select a item</option>

                {items &&
                  items.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item?.name}
                    </option>
                  ))}
              </select>
            </div>

            <br />

            <div>
              <label>Quantity</label>
              <input type="text" onChange={handleQuantity} required />
            </div>

            <button type="submit">Add Stock</button>
          </form>
        )}

        {edit && (
          <form onSubmit={updateStock}>
            <div>
              <label>Item Name</label>
              <select onChange={handleItemName} required>
                <option value="">Select a item</option>

                {items &&
                  items.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                      selected={item.id === itemId}
                    >
                      {item?.name}
                    </option>
                  ))}
              </select>
            </div>

            <br />

            <div>
              <label>quantity</label>
              <input
                type="text"
                onChange={handleQuantity}
                value={quantity}
                required
              />
            </div>

            <button type="submit">Update Stock</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Stocks;
