"use client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import Image from "next/image";
import { useEffect, useState } from "react";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/graphql",
  cache: new InMemoryCache(),
});

export default function Home() {
  const [countriesData, setCountiresData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.query({
          query: gql`
            query ExampleQuery {
              countries {
                languages {
                  name
                }
                currency
                name
                emoji
              }
            }
          `,
        });
        setCountiresData(result.data.countries);
        console.log(result.data.countries);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="min-h-screen flex flex-col p-24 items-center">
      <p className="mb-10 text-5xl font-semibold text-center">
        COUNTRIES AROUND THE WORLD!
      </p>

      <div className="flex flex-wrap justify-center">
        {countriesData?.map((country) => (
          <div
            key={country.name}
            className="rounded-lg border border-neutral-700 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-none hover:dark:bg-neutral-800/30 m-2">
            <h2 className={`mb-3 text-2xl font-semibold`}>{country.name} </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Emoji: {country.emoji}
            </p>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Currency: {country.currency}
            </p>
            {country.languages.length > 0 && (
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                Languages:{" "}
                {country.languages.map((language, index) => (
                  <span key={language.name}>
                    {language.name}
                    {index !== country.languages.length - 1 && ", "}
                  </span>
                ))}
              </p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
