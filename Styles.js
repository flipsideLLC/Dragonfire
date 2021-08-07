import { StyleSheet, Dimensions } from 'react-native';
import colors from './colors';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	OptionsContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 20,
	},
	text: {
		backgroundColor: 'blue',
		flex: 1,
		color: 'black',
		fontWeight: 'bold',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: 14,
	},
	touchableText: {
		alignSelf: 'center',
		justifyContent: 'center',
		paddingVertical: 3,
		marginVertical: 4,
		marginHorizontal: 4,
		fontSize: 16,
		color: 'white',
	},
	decisionText: {
		color: 'black',
		fontWeight: 'bold',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 10,
		fontSize: 14,
	},
	modalContent: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	optionInput: {
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: '#777',
		padding: 20,
		width: windowWidth * 0.9,
		marginVertical: 5,
		color: 'white',
		borderRadius: 8,
		backgroundColor: 'black',
	},
	indicator: {
		flex: 3,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default styles;
