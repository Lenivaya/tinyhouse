import { FC } from "react";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "react-apollo";
import { List, Avatar, Button, Spin, Alert } from "antd";
import { Listings as ListingsData } from "./__generated__/Listings";
import {
  DeleteListing as DeleteListingData,
  DeleteListingVariables
} from "./__generated__/DeleteListing";
import { ListingsSkeleton } from "./components";
import "./styles/Listings.css";

const LISTINGS = gql`
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      rating
    }
  }
`;

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

interface Props {
  title: string;
}

export const Listings: FC<Props> = ({ title }) => {
  const { data, refetch, loading, error } = useQuery<ListingsData>(LISTINGS);
  const listings = data ? data.listings : null;

  const [
    deleteListing,
    { loading: deleteListingLoading, error: deleteListingError }
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

  const handleDeleteListing = async (id: string) => {
    await deleteListing({ variables: { id } });

    refetch();
  };

  const listingsList = listings ? (
    <List
      itemLayout="horizontal"
      dataSource={listings}
      renderItem={listing => (
        <List.Item
          key={listing.id}
          actions={[
            <Button
              type="primary"
              onClick={() => handleDeleteListing(listing.id)}
            >
              Delete
            </Button>
          ]}
        >
          <List.Item.Meta
            title={listing.title}
            description={listing.address}
            avatar={<Avatar src={listing.image} shape="square" size={48} />}
          />
        </List.Item>
      )}
    ></List>
  ) : null;

  const deleteListingErrorMessage = deleteListingError ? (
    <Alert
      type="error"
      message="Something went wrong - please try again"
      className="listings__alert"
    />
  ) : null;

  return (
    <div className="listings">
      {loading ? (
        <ListingsSkeleton title={title} error={error ? true : false} />
      ) : (
        <Spin spinning={deleteListingLoading}>
          {deleteListingErrorMessage}
          <h2>{title}</h2>
          {listingsList}
        </Spin>
      )}
    </div>
  );
};
