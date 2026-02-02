export const useSearch = () => {
  const search = useState<string>("global-search", () => "");
  return { search };
};
