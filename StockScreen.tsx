import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type StockData = {
  id: number;
  title: string;
  name: string;
  value: number;
};

type ItemProps = {
  title: string;
  name: string;
  value: number;
};

const StockButton = ({ title, name, value }: ItemProps) => {
  return (
    <TouchableOpacity style={styles.btn}>
      <View style={styles.titleBtn}>
        <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
      </View>
      <View style={{ marginLeft: 20 }}>
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{name}</Text>
        <Text style={{ color: 'white', fontSize: 18 }}> Giá trị: {value}</Text>
      </View>
    </TouchableOpacity>
  );
};

const StockScreen = ({ navigation }: any) => {
  const [stockData, setStockData] = useState<StockData[]>([]);

  useEffect(() => {
    const apiKey = 'IK88DT3BVNVQH2SE';
    const stockSymbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA'];

    const fetchStockData = async () => {
      try {
        const stockDataPromises = stockSymbols.map(async (symbol) => {
          const response = await axios.get(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
          );
          console.log("________________________________________________________________________________________")
          console.log("| API response for symbol -", symbol, ":", response.data);
          return response.data;
        });

        const fetchedStockData = await Promise.all(stockDataPromises);
        // console.log("Fetched stock data:", fetchedStockData);

        const formattedStockData: StockData[] = fetchedStockData.map((data, index) => ({
          id: index,
          title: data['Global Quote']['01. symbol'],
          name: data['Global Quote']['02. open'],
          value: parseFloat(data['Global Quote']['05. price']),
        }));
        // console.log("Formatted stock data:", formattedStockData);

        setStockData(formattedStockData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStockData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground style={styles.panel} source={require('./assets/src/img/stock-bg.jpg')} resizeMode='cover'>
        <View style={{ borderWidth: 4, borderColor: 'white', borderRadius: 15, backgroundColor: 'white', marginBottom: 10 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'rgba(214, 149, 0, 1)' }}>Tên</Text>
        </View>

        <View style={{ borderWidth: 4, borderColor: 'white', borderRadius: 15, backgroundColor: 'white', marginBottom: 10 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'rgba(214, 149, 0, 1)' }}>GIá trị</Text>
        </View>

        <View style={{ borderWidth: 4, borderColor: 'white', borderRadius: 15, backgroundColor: 'white', marginBottom: 10 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'rgba(214, 149, 0, 1)' }}>% TĂNG HAY GIẢM</Text>
        </View>
      </ImageBackground>

      <View style={{ flex: 1, marginBottom: 40 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', marginLeft: 10, marginTop: 10 }}>Hôm nay:  {new Date().toLocaleDateString()} </Text>
        <View style={{ justifyContent: 'center', marginBottom: 30, marginLeft: 50 }}>
          {stockData && stockData.length > 0 ? (
            <FlatList
              data={stockData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <StockButton title={item.title} name={item.name} value={item.value} />}
            />
          ) : (
            <Text>Không có dữ liệu</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default StockScreen;

const styles = StyleSheet.create({
  panel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 5,
    borderBottomWidth: 5,
    borderRadius: 15,
    width: 300,
    height: 100,
    backgroundColor: 'rgba(0, 151, 126, 1)',
    alignItems: 'center',
    marginTop: 10,
    elevation: 5,
    flexDirection: 'row'
  },
  titleBtn: {
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
    borderRadius: 45,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginLeft: 5
  }
});
