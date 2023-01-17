import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  topHeadlines: {
    marginBottom: 10,
  },
  topHeadlinesTitle: {
    marginBottom: 10,
  },
  body: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  subHeadlines: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: '#ADB5BD',
  },
  headlinesNews: {
    borderBottomWidth: 1,
    borderColor: '#ADB5BD',
    marginBottom: 10,
  },
});

export default styles;
