import { View, Text } from "react-native";
import { IconPhone, IconMapPin, IconTicket } from "@tabler/icons-react-native";
import { Info } from "@/components/Market/Info/Info";
import { styles } from "./styles";
import { PropsDetails } from "@/types/types";

type DetailsProps = {
  data: PropsDetails;
};

export function Details({ data }: DetailsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{data.name}</Text>
      <Text style={styles.description}>{data.description}</Text>
      <View style={styles.group}>
        <Text style={styles.title}>Informações</Text>
        <Info
          icon={IconTicket}
          description={`${data.coupons} cupons disponíveis`}
        />
        <Info icon={IconMapPin} description={data.address} />
        <Info icon={IconPhone} description={data.phone} />
      </View>
      <View style={styles.group}>
        <Text style={styles.title}>Regulamento</Text>
        {data.rules.map((item) => (
          <Text key={item.id} style={styles.rule}>
            {`\u2022 ${item.description}`}
          </Text>
        ))}
      </View>
    </View>
  );
}
