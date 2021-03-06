package com.healthscout;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.gettipsi.stripe.StripeReactPackage;
import com.imagepicker.ImagePickerPackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.pspdfkit.react.PSPDFKitPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.rnfs.RNFSPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new StripeReactPackage(),
            new ImagePickerPackage(),
            new ReactMaterialKitPackage(),
            new PSPDFKitPackage(),
            new LinearGradientPackage(),
            new RNFSPackage(),
            new RNFetchBlobPackage(),
            new RNSpinkitPackage(),
            new VectorIconsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
