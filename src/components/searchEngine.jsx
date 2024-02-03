// import GetMap from './map';
import all_WB_Colleges from "../DataSets/All_West_bengal_colleges.json";
import "../style/output copy.css";
import { useState } from "react";
export default function SearchEngine(props) {
  console.log("calling");
  const [searchType, setsearchType] = useState("local");
  // const [searchCondition,setsearchCondition] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  // const [selected_Item, setSelectedItem ] = useState('');
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const filteredData = all_WB_Colleges.filter((item) => {
    const regex = new RegExp(searchQuery, "i"); // 'i' flag for case-insensitive search
    return regex.test(item.name);
  });
  const Handle_selectedItem = (item) => {
    if (item === undefined) {
      alert("Please Wait! Switching in Search criteria takes little time.....");
      // setSelectedItem("");
      setSearchQuery("");
    } else {
      if (searchType === "local") {
        // setsearchCondition(colList[e.target.innerText].pincode);
        props.func2({
          pincode: item.pincode,
          address: item.address,
        });
      } else {
        // setsearchCondition(colList[e.target.innerText].location);
        props.func1({
          location: item.location,
          address: item.address,
        });
      }
      // console.log("object")
      // console.log(e.target.innerText);
      // setSelectedItem(e.target.innerText);
      setSearchQuery("");
    }
  };
  // const hp = (item)=>{
  //   console.log(item.location);
  // }
  return (
    <>
      <div className="relative top-0 left-auto w-3/4 sm:w-2/3 md:w-2/3  m-auto bg-center flex serach-bar-location ">
        <div className=" search-type relative rounded-md top-1 mr-2 w-48 h-14 px-2 py-1 rounde/d-md bg-white max-w-max flex items-center">
          <div className="inline-block mx-1 bg-white">
            <svg
              className="w-8 h-8 text-gray-500 dark:text-gray-400 "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
            >
              <path
                d="M200,224H150.5A253.6,253.6,0,0,0,174,200.2c27.5-31.5,42-64.8,42-96.2a88,88,0,0,0-176,0c0,31.4,14.5,64.7,42,96.2A253.6,253.6,0,0,0,105.5,224H56a8,8,0,0,0,0,16H200a8,8,0,0,0,0-16ZM128,72a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z"
                fill="#939aa6"
              ></path>
            </svg>
          </div>
          <select
            className=" mx-2 bg-slate-300 rounded px-1.5 py-1 bg-white "
            name=""
            id="s-type"
            onChange={(e) => {
              setsearchType(e.target.value);
              alert("Search Type changes");
            }}
          >
            <option value="local"> local Search </option>
            <option value="Long"> Long Search </option>
          </select>
        </div>
        <div
          id="dropdownSearch"
          className="w-3/4 sm:w-2/3 md:w-1/2 z-10 bg-white rounded-lg shadow dark:bg-gray-700"
        >
          <div className="p-3 w-full bg-white">
            <label htmlFor="input-group-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center w-full pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="input-group-search"
                className=" block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="    Search..."
              />
            </div>
          </div>
          {searchQuery !== "" ? (
            <div>
              <ul
                id="Kolkata_Colleges"
                className=" h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownSearchButton"
              >
                {filteredData.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => {
                      Handle_selectedItem(item);
                    }}
                  >
                    <div className="flex items-center pl-2 rounded mb-4 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
                      <img
                        className="w-10 h-10 mr-2 rounded-md inline-block"
                        src={item.image_url}
                        alt={item.name + " logo"}
                      />
                      <div className="ml-2">
                        <span className=" text-base">{item.name}</span> <br />
                        {/* <span className='ml-2 text-xs'>{item.location.split("|")[0]}</span> */}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <p
                href="#"
                className="flex items-center p-3 text-sm font-medium text-red-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-500 hover:underline"
              ></p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
