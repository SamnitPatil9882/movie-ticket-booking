import React, { useState } from "react";
import { Button, Tabs } from "antd";
import { useGetMoviesQuery } from "../../../../../app/api/moviApi";
import { Avatar, List, message } from "antd";
import VirtualList from "rc-virtual-list";
import { Movie } from "../../../../../app/api/types";
import Create from "./Components/Create";
import Edit from "./Components/Edit";

function MovieInfo() {
  const [isShowMode, setIsShowMode] = useState<boolean>(false);
  const [isCreateMode, setIsCreateMode] = useState<boolean>(false);
  const [editId,setEditId] = useState<number>(-1);
  const {
    data: movies,
    error: movieError,
    isLoading: movieLoading,
  } = useGetMoviesQuery();

  const ContainerHeight = 400;
  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
    // if (Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - ContainerHeight) <= 1) {
    //   appendData();
    // }
  };

  return (
    <div className="min-h-screen bg-black flex">
      <div className="w-1/2 ">
        {
          <div className="bg-gray-600">
            <div>
              <span className="text-white text-2xl">Movie List</span>
            </div>
            <div className="flex justify-end p-2">
              <Button
                onClick={() => {
                  setIsCreateMode(true);
                  setIsShowMode(false);
                }}
                className="bg-white text-xl font-bold m-2 justify-center"
              >
                Create Movie
              </Button>
            </div>
          </div>
        }
        {movies && (
          <List>
            <VirtualList
              data={movies}
              height={ContainerHeight}
              itemHeight={47}
              itemKey="email"
              onScroll={onScroll}
              className="bg-gray-800 text-white"
            >
              {(item: Movie) => (
                <List.Item
                  key={item.title}
                  className="flex border-neutral-50 border-2 rounded-lg m-2"
                >
                  <List.Item.Meta
                    // avatar={<Avatar src={item.} />}
                    title={
                      <span className="text-white text-xl">{item.title}</span>
                    }
                    description={
                      <span className="text-white font-bold">
                        {item.description}
                      </span>
                    }
                  />
                  <div className="m-2 bg-white rounded-lg">
                    <Button
                      onClick={() => {
                        setIsCreateMode(false);
                        setIsShowMode(true);
                        setEditId(item.id)
                      }}
                    >
                      {<span className="text-black text-xl">Show</span>}
                    </Button>
                  </div>
                </List.Item>
              )}
            </VirtualList>
          </List>
        )}
      </div>
      <div className="w-1/2">
        {isCreateMode && <Create />}
        {isShowMode && <Edit editId={editId}/>}
      </div>
    </div>
  );
}

export default MovieInfo;
