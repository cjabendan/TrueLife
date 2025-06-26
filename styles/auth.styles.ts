import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 60,
  },
  iconContainer: {
    marginTop: -30,
  },
  icon: {
    width: 280,
    height: 280,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginVertical: 0,
  },
  iconBackground: {
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 60,
    marginBottom: 10,
    backgroundColor: 'rgba(56, 247, 65, 0.4)',
  },
  title: {
    fontSize: 38,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    letterSpacing: 1,
  },
  description: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    letterSpacing: 1.5,
    marginTop: 10,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 40,
  },
  startButton: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: -15,
  },
  startText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
  buttonContent: {
    flexDirection: 'row',
  },
  google: {
    marginRight: 10,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
    paddingHorizontal: 25
  }
});

export default styles;