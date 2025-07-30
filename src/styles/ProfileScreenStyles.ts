import { StyleSheet } from 'react-native';


const PROFILE_AVATAR_SIZE = 140;

const ProfileScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 34,
  },
  avatarWrapper: {
    width: PROFILE_AVATAR_SIZE,
    height: PROFILE_AVATAR_SIZE,
    borderRadius: PROFILE_AVATAR_SIZE / 2,
    backgroundColor: '#F6E3D7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: PROFILE_AVATAR_SIZE - 10,
    height: PROFILE_AVATAR_SIZE - 10,
    borderRadius: (PROFILE_AVATAR_SIZE - 10) / 2,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: '#888',
    marginBottom: 2,
  },
  joined: {
    fontSize: 14,
    color: '#aaa',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginLeft: 24,
    marginBottom: 8,
    marginTop: 16,
  },
  menuList: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  menuIcon: {
    width: 28,
    height: 28,
    marginRight: 16,
    tintColor: '#222',
  },
  menuText: {
    fontSize: 16,
    color: '#222',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 16,
    zIndex: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    alignSelf: 'center',
    marginTop: 16,
  },
});

export default ProfileScreenStyles;
