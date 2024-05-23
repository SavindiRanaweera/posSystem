import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./utils/Authcontext";

function Categories() {
  const { isAuthenticated, jwtToken } = useAuth();

  const [categories, setCategories] = useState(null);

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [edit, setEdit] = useState(false);

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`
    }
  }

  useEffect(() => {
    if(isAuthenticated){
      getCategory();
    }
    
  }, [isAuthenticated]);

  function getCategory() {
    axios
      .get("http://localhost:8081/categories",config)
      .then(function (response) {
        setCategories(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleName(event) {
    setName(event.target.value);
  }

  const resetForm = () => {
    setName("");
    setEdit(false);
  };

  function createItemCategory(event) {
    event.preventDefault();

    const data = {
      name: name,
    };

    axios
      .post("http://localhost:8081/categories", data,config)
      .then(function (response) {
        console.log(response);
        getCategory();
        resetForm();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function updateItemCategory(event) {
    event.preventDefault();

    const data = {
      name: name,
    };

    axios
      .put("http://localhost:8081/categories/" + categoryId, data,config)
      .then(function (response) {
        getCategory();
        resetForm();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <div className="container table-responsive">
        <h1>Item Category</h1>

        <table className="table table-hover table-secondary table-bordered ">
          <thead className="table-light">
            <tr>
              <th>#ID</th>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories &&
              categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      type="button"
                      onClick={() => {
                        setEdit(true);   
                        setCategoryId(category.id);                    
                        setName(category.name);
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
          <form onSubmit={createItemCategory}>
            <div>
              <label>Category Name</label>
              <input type="text" onChange={handleName} required />
            </div>

            <br />

            <button type="submit">Create Item Category</button>
          </form>
        )}

        {edit && (
          <form onSubmit={updateItemCategory}>
            <div>
              <label>Name</label>
              <input type="text" onChange={handleName} value={name} required />
            </div>

            <br />

            <button type="submit">Update Item Category</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Categories;
