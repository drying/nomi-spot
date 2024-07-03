import { Link } from "@chakra-ui/react";
import { getStoreData } from "../utils/getStoreUtils";

export default async function StoresPage() {
  const stores = await getStoreData();

  return (
    <div>
      <h1>登録お店一覧</h1>
      <ul>
        {stores.map((store) => (
          <li key={store.id}>
            <Link href={`/store/${store.id}`}>{store.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
