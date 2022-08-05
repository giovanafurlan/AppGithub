import { 
  Pressable, 
  StyleSheet,
  Text,
  TextInput,
  View 
} from 'react-native';
import { AiOutlineSearch } from "react-icons/ai";
import { SearchBar } from 'react-native-elements';
import { useState } from 'react';

export default function App() {

  const[usuario, onChangeUsuario] = useState();
  const[avatar, setAvatar] = useState();
  const[id, setId] = useState();
  const[nome, setNome] = useState();
  const[seguindo, setSeguindo] = useState();
  const[seguidores, setSeguidores] = useState();
  const[criacao, setCriacao] = useState();

  function busca(){
    fetch('https://api.github.com/users/' + usuario)
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      const avatar = (data.avatar_url);
      setAvatar(avatar);

      const id = (data.id);
      setId(id);

      const nome = (data.name);
      setNome(nome);

      const following = (data.following);
      setSeguindo(following);

      const followers = (data.followers);
      setSeguidores(followers);

      const criacao = (data.created_at);
      setCriacao(criacao);
    });
  };

  return (
    <View 
     style={styles.container}>
      <Text>Digite o username do git:</Text>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <TextInput 
          value={usuario}
          onChangeText={onChangeUsuario}
          style={styles.input}/>
        <Pressable  
          onPress={busca}
          style={styles.btn}>
          <AiOutlineSearch style={{
            color: 'white'
          }}/>
        </Pressable>
      </View>
      <img 
        src={avatar}
        width="200"
        height="200"
        style={{
          border: '10px',
          margin: '20px'
        }}/>
        <Text>Id: {id}</Text>
        <Text>Nome: {nome}</Text>
        <Text>Followers: {seguidores}</Text>
        <Text>Following: {seguindo}</Text>
        <Text>Criado em: {criacao}</Text>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn:{
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: 'purple',
    width: 22,
    height: 22,
    fontSize: 15
  },
  input: {
    height: 20,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
