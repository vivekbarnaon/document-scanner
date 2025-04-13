/**
 * DeepSite AI inspired theme colors and styles
 */

export const DeepSiteColors = {
  dark: {
    background: {
      primary: '#1a1a2e',
      secondary: '#16213e',
      tertiary: '#0f3460',
    },
    text: {
      primary: '#ffffff',
      secondary: '#e0e0e0',
      accent: '#4cc9f0',
    },
    neon: {
      primary: '#4cc9f0',  // Cyan neon
      secondary: '#f72585', // Pink neon
      tertiary: '#7209b7',  // Purple neon
    },
    card: {
      background: 'rgba(30, 30, 60, 0.65)',
      border: 'rgba(76, 201, 240, 0.3)',
    },
    button: {
      gradientStart: '#4cc9f0',
      gradientEnd: '#7209b7',
      text: '#ffffff',
    },
    input: {
      background: 'rgba(20, 20, 40, 0.65)',
      border: 'rgba(76, 201, 240, 0.5)',
      text: '#ffffff',
      placeholder: 'rgba(255, 255, 255, 0.6)',
    }
  }
};

export const DeepSiteStyles = {
  // Common styles for reuse
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#4cc9f0',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    borderColor: 'rgba(76, 201, 240, 0.3)',
    backgroundColor: 'rgba(30, 30, 60, 0.65)',
  },
  buttonGradient: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginVertical: 8,
    borderColor: 'rgba(76, 201, 240, 0.5)',
    backgroundColor: 'rgba(20, 20, 40, 0.65)',
  },
  screenContainer: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#e0e0e0',
    marginBottom: 16,
  }
}; 