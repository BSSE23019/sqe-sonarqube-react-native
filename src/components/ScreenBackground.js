// The backdrop every screen sits in, so no screen repeats this layout.

// Props:
//   children      the screen's content
//   contentStyle  extra style for the scrolling content (e.g. padding)
//   testID        passed to the outer view
//   edges         which safe-area edges to pad; the Profile tab passes
//                 ['top', 'left', 'right'] because the tab bar covers the bottom
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { IMAGES } from '../assets';
import { COLORS, SPACING } from '../theme';
export default function ScreenBackground({ children, contentStyle, testID, edges }) {
  // Build it from the outside in:
  // 1. ImageBackground with src/assets/images/bg.png, resizeMode "cover",
  //    flex: 1 and a white backgroundColor. It is the OUTERMOST view, so the
  //    image runs behind the status bar.
  // 2. SafeAreaView (from react-native-safe-area-context, with `edges`), so the
  //    content stays below the status bar while the image does not.
  // 3. KeyboardAvoidingView (behavior "padding" on iOS only), so the keyboard
  //    does not cover the inputs.
  // 4. ScrollView: contentContainerStyle flexGrow: 1, paddingHorizontal
  //    SPACING.gutter, then contentStyle on top; keyboardShouldPersistTaps
  //    "handled"; no vertical scroll indicator.
  // 5. {children} inside the ScrollView.

   return (
    <ImageBackground
      source={IMAGES.bg}
      resizeMode="cover"
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <SafeAreaView
        edges={edges}
        style={{ flex: 1 }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView
            testID={testID}
            contentContainerStyle={[
              {
                flexGrow: 1,
                paddingHorizontal: SPACING.gutter,
              },
              contentStyle,
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );


}
