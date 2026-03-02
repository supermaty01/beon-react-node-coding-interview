import React, { FC, useState, useEffect } from "react";

import { RouteComponentProps } from "@reach/router";
import { IUserProps } from "../dtos/user.dto";
import { UserCard } from "../components/users/user-card";
import { CircularProgress } from "@mui/material";

import { BackendClient } from "../clients/backend.client";

const backendClient = new BackendClient();



export const DashboardPage: FC<RouteComponentProps> = () => {
  const [users, setUsers] = useState<IUserProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useState<{
    search: string;
    page: number;
  }>({
    page: 1,
    search: "",
  });

  const searchUsers = (params: { search?: string; page?: number }) => {
    try {
      const fetchData = async () => {
        const result = await backendClient.getAllUsers({
          params: {
            search: params.search,
            page: params.page,
          },
        });
        setUsers(result.data);
        setSearchParams((prev) => ({
          ...prev,
          page: result.page,
        }));
        setLoading(false);
      };
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    searchUsers(searchParams);
  }, []);

  const onSearch = () => {
    searchUsers(searchParams);
  };

  const onNextPage = () => {
    searchUsers({ ...searchParams, page: searchParams.page + 1 });
  };

  const onPreviousPage = () => {
    if (searchParams.page === 1) {
      return;
    }
    

    searchUsers({ ...searchParams, page: searchParams.page - 1 });
  };

  return (
    <div style={{ paddingTop: "30px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100vh",
            }}
          >
            <CircularProgress size="60px" disableShrink />
          </div>
        ) : (
          <div>
            
            <div style={{ display: "flex", justifyContent: "center" }}>
              <input type="text" placeholder="Search by name" id="search-input" onChange={(e) => setSearchParams({ ...searchParams, search: e.target.value })} />
              <button onClick={onSearch}>Search</button>
            </div>
            <div>
              {users.length
              ? users.map((user) => {
                  return <UserCard key={user.id} {...user} />;
                })
              : null}
            </div>
            <div>
              <button onClick={onPreviousPage}>Previous</button>
              <button onClick={onNextPage}>Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
