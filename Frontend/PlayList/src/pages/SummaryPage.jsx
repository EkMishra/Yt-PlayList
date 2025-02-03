import React, { createContext, useState } from "react";
import SummaryForm from "../components/SummaryForm";
import SummaryBlock from "../components/SummaryBlock";

export const DataContext = createContext();

export default function SummaryPage() {
  const [fetchedData, setFetchedData] = useState({ data: null });
  const [loading, setLoading] = useState(false);

  return (
    <DataContext.Provider
      value={{ fetchedData, setFetchedData, loading, setLoading }}
    >
      <SummaryForm />
      <SummaryBlock />
    </DataContext.Provider>
  );
}
