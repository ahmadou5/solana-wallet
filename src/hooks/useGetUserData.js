import { GlobalContext } from "@/context/AppContext";
import { Supabase } from "@/Utils/Supabasedb";
import { useEffect } from "react";
//import { formatEther ,ethers} from "ethers";
import axios from "axios";
export const useGetUserId = () => {
  const baseUrl = "https://api.coingecko.com/api/v3/simple/price";
  
  const {
    setIsAuthenticate,
    isAuthenticate,
    userPkey,
    setUserPkey,
    ethPrice,
    setEthPrice,
    setEthBalance,
    userAddress,
    userName,
    tokens,
    
    history, 
    providerURL,
    setHistory,
    setTokens,
    userMnemonic,setUserMnemonic,
    setUserName,
    setUserAddress,
    isLoading,
    setIsLoading,
    setWelcome,
    user,
  } = GlobalContext();
 
  useEffect(() => {
    const getSolPrice = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}?ids=solana&vs_currencies=usd`
        );
        const price = response.data.solana.usd;
        setEthPrice(price);
        console.log("Current ETH/USD price:", price);
        return price;
      } catch (error) {
        console.error("Error fetching ETH/USD price:", error);
        return null; // Handle errors gracefully
      }
    };
    getSolPrice();
   
    
    const fetchUser = async () => {
      try {
        const { data, error } = await Supabase.from("SolWallet")
          .select("*")
          .eq("id", user?.initDataUnsafe?.user?.id)
          .single();
        if (error) {
          const timeoutId = setTimeout(() => {
            setIsLoading(false);
            //setWelcome(true)
          }, 9000); // 5 seconds in milliseconds
          setIsAuthenticate(false);
          return () => clearTimeout(timeoutId);
        }
        if (data) {
          console.log(data, "data222");
          //setIsAuthenticate(true)
          setUserAddress(data?.userAddress);
          setUserName(data?.username);
          setUserPkey(data?.privateKey);
          console.log('hhhh',userPkey);
          setUserMnemonic(data?.phrase)
          const timeoutId = setTimeout(() => {
            setIsLoading(false);
            setWelcome(true);
          }, 9000); // 5 seconds in milliseconds
          setIsAuthenticate(true);
          return () => clearTimeout(timeoutId);
        }
      } catch (error) {
        console.log(error);
      }
     
    };
    fetchUser();
  }, [user]);
  return true;
};
