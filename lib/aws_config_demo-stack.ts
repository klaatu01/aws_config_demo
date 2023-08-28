import * as cdk from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import { RustFunction } from "rust.aws-cdk-lambda";

export class AwsConfigDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    let api = new RestApi(this, "Api", {
      restApiName: "aws_config_demo",
      description: "API for AWS Config Demo",
    });

    let lambda_128 = new RustFunction(this, "Elapsed128", {
      bin: "aws_config_elapsed",
      directory: ".",
      memorySize: 128,
    });

    let lambda_256 = new RustFunction(this, "Elapsed256", {
      bin: "aws_config_elapsed",
      directory: ".",
      memorySize: 256,
    });

    let lambda_512 = new RustFunction(this, "Elapsed512", {
      bin: "aws_config_elapsed",
      directory: ".",
      memorySize: 512,
    });

    let lambda_1024 = new RustFunction(this, "Elapsed1024", {
      bin: "aws_config_elapsed",
      directory: ".",
      memorySize: 1024,
    });

    api.root
      .addResource("128")
      .addMethod("GET", new LambdaIntegration(lambda_128));
    api.root
      .addResource("256")
      .addMethod("GET", new LambdaIntegration(lambda_256));
    api.root
      .addResource("512")
      .addMethod("GET", new LambdaIntegration(lambda_512));
    api.root
      .addResource("1024")
      .addMethod("GET", new LambdaIntegration(lambda_1024));
  }
}
